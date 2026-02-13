"use client";

import type { Product } from "@/data/products";

interface AccoladePopupProps {
  accolade: Product;
  onClose: () => void;
}

export function AccoladePopup({ accolade, onClose }: AccoladePopupProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accolade-title"
      >
        <div className="p-6 flex flex-col gap-4">
          <div>
            <h2 id="accolade-title" className="text-xl font-semibold text-white">
              {accolade.title}
            </h2>
            <p className="text-white/80 text-sm mt-1">{accolade.description}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-2 w-full py-3 px-5 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/40 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
