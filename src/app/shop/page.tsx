"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const purchasableProducts = products.filter((p) => p.price);

export default function ShopPage() {
  const { addItem } = useCart();

  return (
    <main className="min-h-screen bg-neutral-950 pt-16 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-light text-white tracking-wide mt-8 mb-8">
          Shop All
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {purchasableProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-white font-medium">{product.title}</h2>
                <p className="text-white/70 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-white font-semibold mt-2">{product.price}</p>
                <button
                  onClick={() => addItem(product)}
                  className="mt-3 w-full py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
