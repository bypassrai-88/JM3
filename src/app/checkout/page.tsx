"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalItems, clearCart } = useCart();

  return (
    <main className="min-h-screen bg-neutral-900 text-white p-8 pt-24">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        {items.length === 0 ? (
          <p className="text-white/70 mb-6">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 mb-8">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <span className="font-medium">{product.title}</span>
                <span className="text-white/70">
                  {product.price} × {quantity}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-4">
          <Link
            href="/rooms/front-yard"
            className="px-6 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-colors"
          >
            Keep Shopping
          </Link>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>
        <p className="text-white/50 text-sm mt-6">
          Checkout flow will connect to Shopify when you add your store.
        </p>
      </div>
    </main>
  );
}
