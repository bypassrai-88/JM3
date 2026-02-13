"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { totalItems, items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
        aria-label={`Cart with ${totalItems} items`}
      >
        <span>Cart</span>
        {totalItems > 0 && (
          <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-white text-black text-xs font-bold">
            {totalItems}
          </span>
        )}
      </button>
      {isOpen && (
        <>
          <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl shadow-xl overflow-hidden z-50">
            <div className="p-4 max-h-64 overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-white/70 text-sm">Your cart is empty.</p>
              ) : (
                <ul className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3 text-sm">
                      <span className="text-white font-medium">{product.title}</span>
                      <span className="text-white/70">× {quantity}</span>
                      <span className="text-white ml-auto">{product.price}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <Link
                  href="/checkout"
                  className="block w-full py-2.5 text-center rounded-full bg-white/90 text-black font-semibold hover:bg-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
