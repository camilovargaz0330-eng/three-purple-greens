/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ShoppingCart, User, LogIn, ExternalLink, Settings } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
  ageVerified: boolean;
  onResetAgeVerification: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onScrollToSection,
  ageVerified,
  onResetAgeVerification
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'INICIO', target: 'hero-section' },
    { label: 'TIENDA', target: 'store-section' },
    { label: 'EVENTOS', target: 'events-section' }
  ];

  const handleLinkClick = (target: string) => {
    onScrollToSection(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full top-0 sticky z-50 bg-brand-bg/90 backdrop-blur-xl border-b border-neutral-800 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
      <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        
        {/* BRAND LOGO FRAME */}
        <div 
          onClick={() => handleLinkClick('hero-section')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            id="navbar-logo-img"
            alt="THREE PURPLE GREENS Logo" 
            className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#95da12] group-hover:scale-105" 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNwc3nNTrXr0FpSOmZ7VONRsWp2njqBupT03EGu_zzjhEdswVtRSNsyFHGlglyJzD4VZ6GTLdn8FzHXU9_Mtjpy5NdgIH_yqS9baQBDz3V5XOpl72IdiHhwACMx5WGn05ibSl4ydEzF9Co2WMUhmAQRm2EwOnKzZ1xlFG-ww0IIJc2KRrPGLEZs9M2r33y4IpYe5eYlDOEklhP7QzWV_7GKk_5YmCEmB5naHdk-5PUArZy_LrD02nY9OVGpdpsiPaBPuMkvLdlzbHI"
          />
          <span className="hidden sm:inline-block font-display font-black text-sm tracking-[0.2em] text-brand-text group-hover:text-brand-green-hover transition-colors">
            THREE PURPLE GREENS
          </span>
        </div>

        {/* DESKTOP HIERARCHY */}
        <nav className="hidden md:flex gap-8 items-center">
          {navigationItems.map((item) => (
            <button
              id={`nav-link-${item.target}`}
              key={item.label}
              onClick={() => handleLinkClick(item.target)}
              className="font-display text-sm font-semibold tracking-widest text-[#c2caaf] hover:text-brand-green transition-colors duration-300 relative py-1 cursor-pointer"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-green transition-all group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* CONTROLS */}
        <div className="flex items-center gap-4">
          
          {/* Reset Age Verification Button (for utility in prototype) */}
          {ageVerified && (
            <button 
              id="btn-navbar-reset-age"
              onClick={onResetAgeVerification}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-sm text-[9px] font-mono hover:text-brand-green transition-colors cursor-pointer"
              title="Reiniciar verificación de edad para probar de nuevo"
            >
              <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              RESTABLECER EDAD
            </button>
          )}

          {/* Cart triggers */}
          <button 
            id="btn-navbar-cart"
            onClick={onOpenCart}
            className="relative flex flex-col items-center p-2 hover:text-brand-green transition-all cursor-pointer group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-brand-text-dim group-hover:text-brand-green transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-green text-brand-bg font-mono font-black text-[9px] flex items-center justify-center w-4 h-4 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[8px] uppercase font-bold tracking-widest mt-1 text-brand-text-dim/80 group-hover:text-brand-green transition-colors">
              Carrito
            </span>
          </button>

          {/* User Status Mock */}
          <button 
            id="btn-navbar-login"
            onClick={() => alert('¡Prototipo en Acción! La autenticación simulada está lista para integrarse con Firebase Auth.')}
            className="flex flex-col items-center p-2 hover:text-brand-green transition-all cursor-pointer group"
          >
            <User className="w-5 h-5 text-brand-text-dim group-hover:text-brand-green transition-colors" />
            <span className="text-[8px] uppercase font-bold tracking-widest mt-1 text-brand-text-dim/80 group-hover:text-brand-green transition-colors">
              INGRESAR
            </span>
          </button>

          {/* Hamburger (Mobile Specific) */}
          <button 
            id="btn-navbar-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-brand-green p-2 cursor-pointer hover:bg-neutral-900 rounded-sm"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER ACCORDION */}
      {mobileMenuOpen && (
        <div id="mobile-menu-accordion" className="md:hidden bg-neutral-950 border-t border-neutral-800 p-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navigationItems.map((item) => (
              <button
                id={`mobile-nav-link-${item.target}`}
                key={item.label}
                onClick={() => handleLinkClick(item.target)}
                className="w-full text-left font-display text-sm font-semibold tracking-widest text-[#c2caaf] hover:text-brand-green-hover py-2 border-b border-neutral-900"
              >
                {item.label}
              </button>
            ))}
            
            {/* Quick action to reset age verification */}
            <button 
              id="btn-mobile-reset-age"
              onClick={() => {
                onResetAgeVerification();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left font-mono text-xs text-brand-text-dim opacity-70 hover:text-brand-green flex items-center gap-2 py-2"
            >
              <Settings className="w-4 h-4" />
              REINICIAR DIÁLOGO DE EDAD
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
