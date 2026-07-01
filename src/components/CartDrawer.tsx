/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem, Product } from '../types';
import CheckoutWhatsApp from './CheckoutWhatsApp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  return (
    <div 
      id="cart-drawer-overlay"
      className="fixed inset-0 z-[90] flex justify-end bg-black/80 backdrop-blur-sm"
    >
      {/* Backdrop close area */}
      <div 
        id="cart-drawer-backdrop-trigger"
        onClick={onClose} 
        className="absolute inset-0 cursor-pointer"
      />

      <motion.div 
        id="cart-drawer-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
        className="relative w-full max-w-md bg-neutral-900 border-l border-brand-green/20 h-full flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="text-brand-green w-5 h-5" id="cart-drawer-header-icon" />
            <span className="font-display font-bold uppercase tracking-wider text-brand-text">
              Tu Carrito ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>
          <button 
            id="btn-close-cart-drawer"
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-800 text-brand-text-dim hover:text-white rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div id="cart-drawer-empty-state" className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-6">
                <ShoppingBag className="text-brand-text-dim/40 w-8 h-8" />
              </div>
              <h3 className="font-display font-semibold uppercase text-brand-text tracking-wide mb-2">Tu carrito está vacío</h3>
              <p className="font-sans text-brand-text-dim text-xs leading-relaxed max-w-xs mb-8">
                Descubre nuestra exclusiva gama de flores, tópicos y extractos premium en el catálogo inferior y añade vitalidad a tu rutina.
              </p>
              <button 
                id="btn-cart-empty-close"
                onClick={onClose}
                className="px-6 py-2.5 bg-brand-green text-brand-bg font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-green-hover transition-colors rounded-sm cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                id={`cart-item-row-${item.product.id}`}
                key={item.product.id}
                className="flex items-center gap-4 bg-neutral-950/50 border border-neutral-800/80 p-4 rounded-sm hover:border-brand-green/20 transition-all"
              >
                {/* Product Round Mini Frame */}
                <div className="relative w-16 h-16 shrink-0 rounded-full border border-neutral-800 overflow-hidden bg-brand-bg flex items-center justify-center p-1">
                  <img 
                    id={`cart-item-img-${item.product.id}`}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                    src={item.product.imageUrl}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[9px] text-brand-green uppercase tracking-widest">
                    {item.product.categoryLabel}
                  </span>
                  <h4 className="font-display font-semibold text-xs text-brand-text uppercase truncate mb-1">
                    {item.product.name}
                  </h4>
                  <p className="font-mono text-[11px] text-brand-green font-bold">
                    ${item.product.price.toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                      <button 
                        id={`btn-cart-dec-${item.product.id}`}
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-mono text-brand-text-dim hover:text-white cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs font-bold text-brand-text px-2">{item.quantity}</span>
                      <button 
                        id={`btn-cart-inc-${item.product.id}`}
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-mono text-brand-text-dim hover:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button 
                      id={`btn-cart-del-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-brand-text-dim hover:text-brand-error p-1 transition-colors cursor-pointer"
                      title="Eliminar artículo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Pricing Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-neutral-800 bg-neutral-950/60 font-mono text-xs">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-brand-text-dim">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-text-dim">
                <span>Impuesto (16%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="h-[1px] bg-neutral-800 my-2"></div>
              <div className="flex justify-between text-brand-text font-bold text-sm">
                <span className="font-display uppercase tracking-wider text-xs">Total Estimado:</span>
                <span className="text-brand-green font-display font-black text-base glow-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                id="btn-checkout-trigger"
                onClick={() => setShowCheckout(true)}
                className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-brand-bg font-display font-extrabold uppercase tracking-widest text-xs py-4 rounded-sm transition-all shadow-[0_4px_15px_rgba(149,218,18,0.25)] hover:shadow-[0_0_20px_rgba(182,255,64,0.6)] cursor-pointer decoration-transparent select-none"
              >
                <span>Proceder al Pago en WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                id="btn-clear-cart-trigger"
                onClick={onClearCart}
                className="w-full py-2 border border-dashed border-neutral-800 text-[10px] text-brand-text-dim hover:text-white rounded-sm transition-colors cursor-pointer uppercase tracking-widest hover:border-brand-error/30"
              >
                Vaciar Carrito
              </button>
            </div>

            <div className="flex items-center gap-1.5 justify-center mt-4 text-[9px] text-brand-text-dim/50 uppercase text-center tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green shrink-0" />
              Transacción protegida por protocolo TPG
            </div>
          </div>
        )}
      </motion.div>

      <CheckoutWhatsApp
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        onCheckoutComplete={() => {
          onClearCart();
          onClose();
        }}
      />
    </div>
  );
}
