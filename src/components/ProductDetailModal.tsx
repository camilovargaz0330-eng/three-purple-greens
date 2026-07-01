/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, ShoppingCart, Star, HelpCircle, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoved, setIsLoved] = useState(false);
  const [added, setAdded] = useState(false);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <motion.div 
        id="product-detail-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative max-w-4xl w-full bg-neutral-900 border border-brand-green/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(119,1,208,0.25)] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button 
          id="btn-close-product-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 border border-neutral-800 text-brand-text-dim hover:text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image Showcase */}
        <div className="md:w-1/2 bg-gradient-to-br from-neutral-950 to-neutral-900 flex flex-col items-center justify-center p-8 relative border-b md:border-b-0 md:border-r border-neutral-800">
          {/* Ambient Purple Soft Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-purple/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="relative w-56 h-56 md:w-72 md:h-72">
            <div className="absolute inset-0 rounded-full border border-brand-green/20 animate-[spin_50s_linear_infinite]"></div>
            <div className="absolute inset-4 rounded-full border border-dashed border-brand-purple/20 animate-[spin_35s_linear_infinite_reverse]"></div>
            
            <div className="absolute inset-6 rounded-full overflow-hidden p-3 bg-brand-bg/80 flex items-center justify-center border border-brand-green/10">
              <img 
                id="modal-product-detail-img"
                alt={product.name}
                className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                src={product.imageUrl}
              />
            </div>
          </div>
          
          <div className="flex gap-4 mt-6 z-10">
            <button 
              id="btn-like-product"
              onClick={() => setIsLoved(!isLoved)}
              className="px-4 py-2 bg-neutral-800/80 hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all text-brand-text cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${isLoved ? 'fill-brand-error text-brand-error' : 'text-brand-text-dim'}`} />
              {isLoved ? 'En Favoritos' : 'Me Gusta'}
            </button>
            <span className="px-4 py-2 bg-neutral-950 border border-neutral-800 text-xs font-mono tracking-wider rounded-sm text-brand-text-dim flex items-center gap-1.5 whitespace-nowrap">
              <Star className="w-3.5 h-3.5 fill-brand-green text-brand-green" />
              {product.rating.toFixed(1)} / 5
            </span>
          </div>
        </div>

        {/* Right Side: Product Custom Attributes */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[600px]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green mb-1 block">
              {product.categoryLabel}
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-brand-text uppercase mb-4 tracking-wide leading-tight">
              {product.name}
            </h2>

            <div className="flex gap-3 items-center mb-6">
              <span className="font-display font-extrabold text-2xl text-brand-green glow-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="font-sans text-xs text-brand-text-dim/80 bg-neutral-800 px-2 py-0.5 rounded">
                Por Unidad ({product.sizeOrWeight})
              </span>
            </div>

            <p className="font-sans text-brand-text-dim text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Scientific stats block (THC, CBD, Terpenes) */}
            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-5 mb-6">
              <h4 className="font-mono text-[10px] text-brand-text-dim uppercase tracking-widest mb-3.5 border-b border-neutral-800 pb-2">
                Especificaciones Botánicas
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {product.thc && (
                  <div>
                    <span className="font-sans text-[11px] text-brand-text-dim/60 block">THC</span>
                    <span className="font-mono font-bold text-sm text-brand-purple-light">{product.thc}</span>
                  </div>
                )}
                {product.cbd && (
                  <div>
                    <span className="font-sans text-[11px] text-brand-text-dim/60 block">CBD</span>
                    <span className="font-mono font-bold text-sm text-brand-green">{product.cbd}</span>
                  </div>
                )}
              </div>

              {product.terpenes && product.terpenes.length > 0 && (
                <div className="mb-3">
                  <span className="font-sans text-[11px] text-brand-text-dim/60 block mb-1">Terpenos dominantes:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.terpenes.map((terpene, index) => (
                      <span 
                        key={index} 
                        className="font-mono text-[10px] px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded-sm text-brand-text/80"
                      >
                        {terpene}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.effects && product.effects.length > 0 && (
                <div>
                  <span className="font-sans text-[11px] text-brand-text-dim/60 block mb-1">Efectos reportados:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.effects.map((effect, index) => (
                      <span 
                        key={index} 
                        className="font-mono text-[10px] px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded-sm text-brand-green"
                      >
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="border-t border-neutral-800 pt-6 mt-4">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between border border-neutral-800 bg-neutral-950 p-1.5 rounded-sm sm:w-36">
                <button 
                  id="btn-decrement-quantity"
                  onClick={decrement}
                  className="w-10 h-10 flex items-center justify-center font-mono text-lg font-bold text-brand-text-dim hover:text-white hover:bg-neutral-900 rounded-sm cursor-pointer"
                >
                  -
                </button>
                <span className="font-mono font-bold text-brand-text px-4">{quantity}</span>
                <button 
                  id="btn-increment-quantity"
                  onClick={increment}
                  className="w-10 h-10 flex items-center justify-center font-mono text-lg font-bold text-brand-text-dim hover:text-white hover:bg-neutral-900 rounded-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add Button */}
              <button 
                id="btn-add-to-cart-modal"
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 font-display font-semibold uppercase tracking-widest text-xs rounded-sm transition-all duration-300 cursor-pointer ${
                  added 
                    ? 'bg-neutral-800 border border-neutral-700 text-brand-text-dim' 
                    : 'bg-brand-green text-brand-bg hover:bg-brand-green-hover glow-primary-box hover:shadow-[0_0_20px_rgba(182,255,64,0.45)]'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? 'Añadido Correctamente' : 'Añadir al Carrito'}
              </button>
            </div>
            
            <p className="text-center font-mono text-[9px] text-brand-text-dim opacity-40 mt-4 tracking-wider flex items-center justify-center gap-1 uppercase">
              <HelpCircle className="w-3 h-3" />
              Consumo responsable para mayores de 21 años
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
