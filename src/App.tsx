/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Award, ShieldAlert, Heart, Sprout, ArrowDown, ExternalLink } from 'lucide-react';

import { Product, UpcomingEvent, CartItem } from './types';
import { PRODUCTS, UPCOMING_EVENTS } from './data';

import AgeVerification from './components/AgeVerification';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import EventCard from './components/EventCard';

export default function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Store products and events in local states to allow interactive RSVPs and stock selections
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'cepa' | 'topico' | 'extracto'>('all');

  // Load state and cache parameters in LocalStorage
  useEffect(() => {
    // Standard event structures
    setEvents(UPCOMING_EVENTS);

    const savedCart = localStorage.getItem('tpg_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }

    const savedRSVPs = localStorage.getItem('tpg_rsvps');
    if (savedRSVPs) {
      try {
        setRegisteredEventIds(JSON.parse(savedRSVPs));
      } catch (e) {
        console.error('Error loading rsvps:', e);
      }
    }
  }, []);

  // Save changes to localStorage on state changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('tpg_cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('tpg_cart');
    }
  }, [cartItems]);

  const handleResetAgeGate = () => {
    localStorage.removeItem('tpg_age_verified');
    setAgeVerified(false);
    window.location.reload();
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Open cart drawer for delightful feedback
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // RSVP management
  const handleRegisterEvent = (eventId: string) => {
    if (registeredEventIds.includes(eventId)) return;
    
    // Increment registered count in UI state
    setEvents(prev => prev.map(ev => 
      ev.id === eventId 
        ? { ...ev, registeredCount: ev.registeredCount + 1 }
        : ev
    ));

    const updatedRSVPs = [...registeredEventIds, eventId];
    setRegisteredEventIds(updatedRSVPs);
    localStorage.setItem('tpg_rsvps', JSON.stringify(updatedRSVPs));
    
    alert('¡Perfecto! Te has registrado con éxito. Te hemos enviado un boleto digital ficticio a tu perfil.');
  };

  // Filter products by categoric state
  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="font-sans text-brand-text bg-brand-bg min-h-screen relative flex flex-col justify-between selection:bg-brand-green selection:text-brand-bg">
      <div className="ambient-purple"></div>

      {/* Age Verification Overlay Gate */}
      <AgeVerification onVerified={() => setAgeVerified(true)} />

      {/* Header Panel */}
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
        ageVerified={ageVerified}
        onResetAgeVerification={handleResetAgeGate}
      />

      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section 
          id="hero-section" 
          className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden px-6 md:px-0"
        >
          {/* Parallax Hero Image background frame */}
          <div className="absolute inset-0 z-0">
            <img 
              id="hero-bg-img"
              alt="Hero Cannabis Landscape with Purple Green lighting" 
              className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105" 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgCa1V8_AUTGYp3vS6OOrSPW6CRYouHXYIVkpjvkfr0KhW7cxqXxhrqoOvkWFQ8XmE-uO5xD4g_Oz1Ofy9mBv9aON75Y9vnp5TLmyH1eEXW1Mfif7XFLDWb4sRSzRGzFADogaax0fsw69fiXxBcyhMqw6jV81Ww47J_KqOjj1ZK9t8jZULsftGU_0J7e1ujqeJM7HLyK7YZSlsaKu33lvhuaDzSc18YAwJ947ozHcSu4-SIe1pAFGqnpjTQiLk3DcMZtwEJnrQvywH"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-black/45"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl px-4 md:px-12 border-x border-brand-green/15 py-24 md:py-32">
            <div className="inline-flex items-center gap-1 bg-neutral-900/80 border border-brand-green/30 rounded-full px-4 py-1.5 mb-6 shadow-[0_0_12px_rgba(149,218,18,0.15)] animate-pulse">
              <Sparkles className="w-4 h-4 text-brand-green" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-brand-green uppercase font-semibold">
                Estilo de Vida Botánico Premium
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-brand-green uppercase tracking-widest mb-6 glow-primary leading-none">
              DESPIERTA TU VIBRANCIA
            </h1>

            <p className="font-sans text-brand-text/90 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Bienvenido al santuario digital de <span className="text-brand-purple-light font-semibold">Three Purple Greens</span>. 
              Descubre flores cultivadas éticamente con perfiles de terpenos artesanales, bálsamos de sienes terapéuticos y extractos cristalinos purificados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                id="btn-hero-shop-now"
                onClick={() => handleScrollToSection('store-section')}
                className="w-full sm:w-auto px-10 py-4 bg-brand-green text-brand-bg font-display font-black text-sm uppercase tracking-widest rounded-sm hover:bg-brand-green-hover transition-all duration-300 shadow-[0_0_25px_rgba(149,218,18,0.4)] hover:shadow-[0_0_35px_rgba(149,218,18,0.65)] hover:scale-105 cursor-pointer"
              >
                COMPRAR AHORA
              </button>
              
              <button 
                id="btn-hero-learn-more"
                onClick={() => handleScrollToSection('events-section')}
                className="w-full sm:w-auto px-10 py-4 border border-brand-purple text-brand-purple-light hover:bg-brand-purple hover:text-white font-display font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>VER EVENTOS</span>
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animated decorative sparks */}
          <div className="absolute top-10 left-6 md:top-20 md:left-20 animate-bounce">
            <Sparkles className="text-brand-green w-6 h-6 opacity-30" />
          </div>
          <div className="absolute bottom-10 right-6 md:bottom-20 md:right-20 animate-pulse">
            <Sparkles className="text-brand-purple-light w-5 h-5 opacity-40" />
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION */}
        <section id="store-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-neutral-900">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-green uppercase tracking-wider mb-3">
              Catálogo de Especialidad
            </h2>
            <p className="font-mono text-xs text-brand-text-dim tracking-[0.25em] uppercase">
              SELECCIONADO METICULOSAMENTE POR BOTÁNICOS EXPERTOS
            </p>
            <div className="w-24 h-[3px] bg-brand-green mx-auto mt-4 shadow-[0_0_10px_#95da12]"></div>
          </div>

          {/* CATEGORY TABS FILTERS */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-12">
            {[
              { id: 'all', label: 'TODOS LOS PRODUCTOS' },
              { id: 'cepa', label: 'FLOR / CEPAS' },
              { id: 'topico', label: 'TÓPICOS CORPORALES' },
              { id: 'extracto', label: 'EXTRACTOS PUROS' }
            ].map((tab) => (
              <button
                id={`tab-filter-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300 border cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-brand-green text-brand-bg font-bold border-brand-green shadow-[0_0_12px_rgba(149,218,18,0.3)]'
                    : 'bg-neutral-950/40 text-brand-text-dim hover:text-white border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard 
                    product={product} 
                    onSelect={(prod) => setSelectedProduct(prod)} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* EDUCATIONAL BRAND STATEMENT BANNER */}
        <section className="bg-gradient-to-r from-neutral-950 via-brand-bg to-neutral-950 py-16 px-6 border-y border-neutral-900">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            <div className="p-3 bg-brand-purple/10 border border-brand-purple/30 rounded-full mb-6">
              <Sprout className="w-8 h-8 text-brand-purple-light" id="sprout-vector-icon" />
            </div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-brand-text uppercase tracking-wider mb-4 leading-snug">
              Cultivo Responsable, Ciencia Cristalina
            </h3>
            <p className="font-sans text-brand-text-dim/90 text-sm max-w-2xl leading-relaxed mb-6">
              En Three Purple Greens creemos en la honestidad molecular. Toda nuestra flor se cultiva orgánicamente con nutrientes vivos libres de pesticidas químicos. Cada extracto conserva con precisión los perfiles nativos de limoneno, mirceno y betacariofileno, asegurando pureza organoléptica.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-[10px] font-mono text-brand-text-dim/80">
              <span className="flex items-center gap-1">✦ CULTIVO INDOOR CLIMATIZADO</span>
              <span className="flex items-center gap-1">✦ CERTIFICADO ORGÁNICO</span>
              <span className="flex items-center gap-1">✦ LAB-TESTED 100% TRANSPARENTE</span>
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS SECTION */}
        <section id="events-section" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-green uppercase tracking-wider mb-3">
              Próximos Eventos
            </h2>
            <p className="font-mono text-xs text-brand-text-dim tracking-[0.25em] uppercase">
              SENSORIAL • COMUNIDAD • BIENESTAR INTEGRADO
            </p>
            <div className="w-16 h-[3px] bg-brand-purple mx-auto mt-4 shadow-[0_0_10px_#7701d0]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event.id}
                event={event}
                isRegistered={registeredEventIds.includes(event.id)}
                onRegister={handleRegisterEvent}
              />
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-16 bg-neutral-950 border-t border-neutral-900 mt-20 relative overflow-hidden">
        {/* Soft violet backdrop decoration */}
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start pb-12 border-b border-neutral-900">
            
            {/* Left side: Logo & Slogan */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2.5 mb-4 group cursor-pointer">
                <img 
                  id="footer-logo-img"
                  alt="THREE PURPLE GREENS Logo" 
                  className="h-9 w-auto object-contain" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNwc3nNTrXr0FpSOmZ7VONRsWp2njqBupT03EGu_zzjhEdswVtRSNsyFHGlglyJzD4VZ6GTLdn8FzHXU9_Mtjpy5NdgIH_yqS9baQBDz3V5XOpl72IdiHhwACMx5WGn05ibSl4ydEzF9Co2WMUhmAQRm2EwOnKzZ1xlFG-ww0IIJc2KRrPGLEZs9M2r33y4IpYe5eYlDOEklhP7QzWV_7GKk_5YmCEmB5naHdk-5PUArZy_LrD02nY9OVGpdpsiPaBPuMkvLdlzbHI"
                />
                <span className="font-display font-black text-sm tracking-[0.15em] text-brand-green glow-primary">
                  THREE PURPLE GREENS
                </span>
              </div>
              <p className="font-sans text-brand-text-dim text-xs leading-relaxed max-w-sm">
                Estilo de vida, medicina herbolaria y experiencias sensoriales botánicas para una comunidad vibrante y despierta.
              </p>
            </div>

            {/* Middle: Help links */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#95da12] mb-2 font-bold select-none">
                Enlaces del Santuario
              </h4>
              <nav className="flex flex-col items-center gap-2 font-sans text-xs text-brand-text-dim">
                <button onClick={() => handleScrollToSection('hero-section')} className="hover:text-white transition-colors cursor-pointer">Contacto de Soporte</button>
                <button onClick={() => handleScrollToSection('store-section')} className="hover:text-white transition-colors cursor-pointer">Preguntas Frecuentes</button>
                <button onClick={handleResetAgeGate} className="text-brand-purple-light hover:text-white transition-colors cursor-pointer font-mono">Verificar Edad Nuevamente</button>
              </nav>
            </div>

            {/* Right: Terms & Social Link Vector frame */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#95da12] font-bold select-none">
                Cumplimiento Legal
              </h4>
              <p className="font-sans text-[10px] text-brand-text-dim/70 leading-relaxed max-w-sm">
                PROTOTIPO DE EXHIBICIÓN SENSORIAL. El contenido de este sitio está destinado exclusivamente a fines informativos y de entretenimiento bajo licencias de demostración. No se promueve la venta comercial de sustancias controladas.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-brand-text-dim hover:text-brand-green transition-colors p-1" title="Twitter">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a href="#" className="text-brand-text-dim hover:text-brand-green transition-colors p-1" title="Instagram">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-[11px] font-mono text-brand-text-dim/60">
            <span>© 2077 THREE PURPLE GREENS. Todos los derechos reservados.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-green transition-colors select-all">TÉRMINOS Y PRIVACIDAD</a>
              <span>•</span>
              <a href="#" className="hover:text-brand-purple-light transition-colors">CÓDIGO DE ÉTICA</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      
      {/* 1. Sliding Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

      {/* 2. Interactive Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
