"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { places } from "@/data/places";
import { getProductByHandle } from "@/data/products";
import { PlaceViewer } from "@/components/PlaceViewer";
import { ProductPopup } from "@/components/ProductPopup";
import { AccoladePopup } from "@/components/AccoladePopup";
import { useCart } from "@/context/CartContext";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { addItem } = useCart();

  const place = useMemo(() => places.find((p) => p.slug === slug), [slug]);
  const [popupProduct, setPopupProduct] = useState<string | null>(null);
  const [popupAccolade, setPopupAccolade] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleRoomNavigate = (target: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(`/rooms/${target}`);
    }, 550);
  };

  const handleBack = () => {
    setIsExiting(true);
    const slugToUse = place?.slug;
    setTimeout(() => {
      if (slugToUse === "clubhouse") {
        router.push("/");
      } else {
        router.push("/rooms/clubhouse");
      }
    }, 550);
  };

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <p>Room not found.</p>
      </div>
    );
  }

  const product = popupProduct ? getProductByHandle(popupProduct) : null;
  const accolade = popupAccolade ? getProductByHandle(popupAccolade) : null;

  return (
    <>
      <PlaceViewer
        place={place}
        onProductClick={(handle) => setPopupProduct(handle)}
        onAccoladeClick={(handle) => setPopupAccolade(handle)}
        onRoomNavigate={handleRoomNavigate}
        onBack={handleBack}
        isExiting={isExiting}
      />
      {product && (
        <ProductPopup
          product={product}
          onClose={() => setPopupProduct(null)}
          onAddToCart={() => {
            addItem(product);
            setPopupProduct(null);
          }}
        />
      )}
      {accolade && (
        <AccoladePopup accolade={accolade} onClose={() => setPopupAccolade(null)} />
      )}
    </>
  );
}
