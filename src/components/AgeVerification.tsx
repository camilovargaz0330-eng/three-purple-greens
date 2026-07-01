/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface AgeVerificationProps {
  onVerified: () => void;
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const saved = localStorage.getItem('tpg_age_verified');
    if (saved === 'true') {
      setIsVisible(false);
      onVerified();
    }
  }, [onVerified]);

  const handleYes = () => {
    localStorage.setItem('tpg_age_verified', 'true');
    setIsVisible(false);
    onVerified();
  };

  const handleNo = () => {
    setDenied(true);
  };

  const handleReset = () => {
    setDenied(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      id="age-verification-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/95 backdrop-blur-2xl transition-all duration-700"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] ambient-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] ambient-glow" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="relative max-w-md w-full mx-4 p-8 glass-card luminescent-border overflow-hidden rounded-lg shadow-2xl">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
          <img 
            id="modal-watermark"
            alt="Watermark" 
            className="w-64 h-64 object-contain" 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNwc3nNTrXr0FpSOmZ7VONRsWp2njqBupT03EGu_zzjhEdswVtRSNsyFHGlglyJzD4VZ6GTLdn8FzHXU9_Mtjpy5NdgIH_yqS9baQBDz3V5XOpl72IdiHhwACMx5WGn05ibSl4ydEzF9Co2WMUhmAQRm2EwOnKzZ1xlFG-ww0IIJc2KRrPGLEZs9M2r33y4IpYe5eYlDOEklhP7QzWV_7GKk_5YmCEmB5naHdk-5PUArZy_LrD02nY9OVGpdpsiPaBPuMkvLdlzbHI"
          />
        </div>

        <AnimatePresence mode="wait">
          {!denied ? (
            <motion.div 
              id="verification-step-content"
              key="verification"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 text-center"
            >
              <div className="mb-8">
                <img 
                  id="modal-verification-logo"
                  alt="THREE PURPLE GREENS" 
                  className="h-14 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(149,218,18,0.3)] hover:scale-105 transition-transform duration-300" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNwc3nNTrXr0FpSOmZ7VONRsWp2njqBupT03EGu_zzjhEdswVtRSNsyFHGlglyJzD4VZ6GTLdn8FzHXU9_Mtjpy5NdgIH_yqS9baQBDz3V5XOpl72IdiHhwACMx5WGn05ibSl4ydEzF9Co2WMUhmAQRm2EwOnKzZ1xlFG-ww0IIJc2KRrPGLEZs9M2r33y4IpYe5eYlDOEklhP7QzWV_7GKk_5YmCEmB5naHdk-5PUArZy_LrD02nY9OVGpdpsiPaBPuMkvLdlzbHI"
                />
                <h2 className="font-display font-extrabold text-2xl text-brand-green uppercase tracking-widest glow-primary mb-4">
                  ¿Eres mayor de 21 años?
                </h2>
                <div className="h-[2px] w-12 bg-brand-green mx-auto mb-5 shadow-[0_0_8px_#95da12]"></div>
                <p className="font-sans text-brand-text/80 text-sm leading-relaxed max-w-sm mx-auto">
                  Para ingresar a nuestro espacio virtual de bienestar y botánica premium, debes certificar que eres mayor de edad según la regulación vigente.
                </p>
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <button 
                  id="btn-age-verify-yes"
                  onClick={handleYes}
                  className="flex-1 px-8 py-3.5 bg-brand-green text-brand-bg font-display font-bold uppercase tracking-widest rounded-sm glow-primary-box hover:bg-brand-green-hover hover:shadow-[0_0_20px_rgba(182,255,64,0.6)] focus:ring-2 focus:ring-brand-green focus:outline-none transition-all duration-300 cursor-pointer text-sm"
                >
                  SÍ, SOY MAYOR
                </button>
                <button 
                  id="btn-age-verify-no"
                  onClick={handleNo}
                  className="flex-1 px-8 py-3.5 border border-brand-text-dim text-brand-text hover:border-brand-error hover:text-brand-error font-display font-bold uppercase tracking-widest rounded-sm focus:ring-2 focus:ring-brand-error focus:outline-none transition-all duration-300 cursor-pointer text-xs"
                >
                  NO
                </button>
              </div>
              <p className="font-mono text-[10px] text-brand-text-dim opacity-50 mt-6 tracking-wider">
                THREE PURPLE GREENS • MONA PROTO
              </p>
            </motion.div>
          ) : (
            <motion.div 
              id="denied-step-content"
              key="denied"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 text-center py-6"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-brand-error/10 border border-brand-error/30 rounded-full animate-pulse">
                  <ShieldAlert className="text-brand-error w-12 h-12" id="denied-shield-icon" />
                </div>
              </div>
              
              <h2 className="font-display font-black text-2xl text-brand-error uppercase tracking-wider mb-4">
                ACCESO DENEGADO
              </h2>
              
              <p className="font-sans text-brand-text-dim text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                Lo sentimos, debes ser mayor de 21 años para acceder al catálogo, tienda y eventos de <span className="text-brand-purple-light font-bold">THREE PURPLE GREENS</span>. Su seguridad es de extrema prioridad.
              </p>

              <button 
                id="btn-age-verify-retry"
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-brand-green border-b border-brand-green hover:text-white hover:border-white transition-all cursor-pointer pb-1"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" id="retry-spinner-icon" style={{ animationDuration: '4s' }} />
                INTENTAR DE NUEVO
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
