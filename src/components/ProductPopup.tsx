"use client";

import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductPopupProps {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}

export function ProductPopup({ product, onClose, onAddToCart }: ProductPopupProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Glass popup card */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-title"
      >
        <div className="p-6 flex flex-col gap-4">
          {/* Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 448px) 100vw, 600px"
              quality={95}
              priority
            />
          </div>
          {/* Info */}
          <div>
            <h2 id="product-title" className="text-xl font-semibold text-white">
              {product.title}
            </h2>
            <p className="text-white/80 text-sm mt-1">{product.description}</p>
            <p className="text-lg font-bold text-white mt-2">{product.price}</p>
          </div>
          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={onAddToCart}
              className="flex-1 py-3 px-5 rounded-full bg-white/90 backdrop-blur-sm text-black font-semibold hover:bg-white transition-colors duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
            >
              Keep Looking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
