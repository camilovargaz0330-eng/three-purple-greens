/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="glass-card luminescent-border p-6 md:p-8 text-center flex flex-col items-center group transition-all duration-500 hover:-translate-y-2 relative"
    >
      {/* Category Tag Badge */}
      <div 
        id={`product-badge-${product.id}`}
        className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-brand-bg/90 border border-brand-green/30 rounded-full"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-brand-green-hover">
          {product.category}
        </span>
      </div>

      {/* Ratings Badge */}
      <div 
        id={`product-rating-badge-${product.id}`}
        className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-mono text-brand-text-dim"
      >
        <Star className="w-3 h-3 fill-brand-green text-brand-green" />
        <span>{product.rating.toFixed(1)}</span>
      </div>

      {/* Image with rotating glowing borders */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 mt-4 mb-6">
        {/* Outer slow-spinning decorative borders */}
        <div className="absolute inset-0 rounded-full border border-dashed border-brand-green/40 animate-[spin_30s_linear_infinite]"></div>
        <div className="absolute inset-2 rounded-full border border-brand-purple/40 animate-[spin_20s_linear_infinite_reverse]"></div>
        
        {/* Glow backdrop */}
        <div className="absolute inset-4 rounded-full bg-radial from-brand-purple/10 to-transparent blur-md"></div>
        
        {/* High contrast center image wrapper */}
        <div className="absolute inset-1.5 rounded-full overflow-hidden p-2 bg-gradient-to-br from-brand-bg to-brand-bg/40 flex items-center justify-center">
          <img 
            id={`product-img-${product.id}`}
            alt={product.name} 
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" 
            referrerPolicy="no-referrer"
            src={product.imageUrl}
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="mb-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-text-dim mb-1 block">
            {product.categoryLabel}
          </span>
          <h3 className="font-display font-semibold text-lg md:text-xl text-brand-text uppercase mb-2 group-hover:text-brand-green transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="font-sans text-brand-text-dim text-xs leading-relaxed max-w-xs mx-auto line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Technical components: THC / CBD */}
        <div className="flex gap-2 justify-center items-center mt-4">
          {product.thc && (
            <span className="font-mono text-[10.5px] px-2.5 py-0.5 bg-brand-purple/10 border border-brand-purple/25 text-brand-purple-light rounded-sm">
              THC: {product.thc}
            </span>
          )}
          {product.cbd && (
            <span className="font-mono text-[10.5px] px-2.5 py-0.5 bg-brand-green/10 border border-brand-green/25 text-brand-green rounded-sm">
              CBD: {product.cbd}
            </span>
          )}
          <span className="font-mono text-[10.5px] px-2 py-0.5 bg-neutral-900/40 border border-neutral-800 text-brand-text/50 rounded-sm">
            {product.sizeOrWeight}
          </span>
        </div>
      </div>

      <div className="w-full border-t border-brand-green/15 pt-5 flex items-center justify-between gap-2 mt-auto">
        <div className="text-left">
          <span className="font-mono text-[9px] uppercase tracking-wider text-brand-text-dim block">Precio</span>
          <span className="font-display font-bold text-lg md:text-xl text-brand-text group-hover:text-brand-green-hover transition-colors">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button 
          id={`btn-view-details-${product.id}`}
          onClick={() => onSelect(product)}
          className="px-5 py-2.5 border border-brand-green text-brand-green font-mono text-xs uppercase tracking-widest hover:bg-brand-green hover:text-brand-bg transition-all duration-300 rounded-sm cursor-pointer hover:font-bold hover:shadow-[0_0_15px_rgba(149,218,18,0.3)] shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          VER DETALLES
        </button>
      </div>
    </div>
  );
}
