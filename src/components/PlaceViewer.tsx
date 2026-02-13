"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LABEL_DURATION_MS = 3500;
import type { Place } from "@/lib/types";
import { HotspotButton } from "./HotspotButton";
import type { ProductHotspot, AccoladeHotspot } from "@/lib/types";
import { getProductByHandle } from "@/data/products";

const ZOOM = 1.4; // 1.4x zoom – scroll/pan to explore, click dots.

interface PlaceViewerProps {
  place: Place;
  onProductClick: (handle: string) => void;
  onAccoladeClick?: (handle: string) => void;
  onRoomNavigate?: (target: string) => void;
  onBack?: () => void;
  isExiting?: boolean;
}

export function PlaceViewer({ place, onProductClick, onAccoladeClick, onRoomNavigate, onBack, isExiting }: PlaceViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedHotspot, setExpandedHotspot] = useState<string | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, []);

  const centerScroll = (smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollW = el.scrollWidth - el.clientWidth;
    const scrollH = el.scrollHeight - el.clientHeight;
    el.scrollTo({
      left: Math.max(0, scrollW / 2),
      top: Math.max(0, scrollH / 2),
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    centerScroll(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => centerScroll(false));
    });
    const t1 = setTimeout(() => centerScroll(false), 50);
    const t2 = setTimeout(() => centerScroll(true), 200);
    const ro = new ResizeObserver(() => centerScroll(true));
    if (contentRef.current) ro.observe(contentRef.current);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
    };
  }, [place.slug]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    setExpandedHotspot(null);
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollRef.current?.scrollLeft ?? 0,
      scrollTop: scrollRef.current?.scrollTop ?? 0,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = dragStart.current.x - e.clientX;
    const dy = dragStart.current.y - e.clientY;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft + dx;
    scrollRef.current.scrollTop = dragStart.current.scrollTop + dy;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <div
      ref={scrollRef}
      className={`relative w-full h-screen overflow-auto bg-neutral-900 scroll-smooth ${
        isExiting ? "animate-room-exit" : "animate-room-enter"
      } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content sized to viewport – full image visible, no cropping */}
      <div
        ref={contentRef}
        className="relative shrink-0"
        style={{
          width: `${ZOOM * 100}vw`,
          height: `${ZOOM * 100}vh`,
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <Image
          src={place.backgroundImage}
          alt={place.name}
          fill
          className="object-contain"
          sizes="(max-width: 1920px) 2700px, 5400px"
          quality={95}
          priority
          draggable={false}
          onLoad={() => centerScroll(false)}
        />
        {/* Hotspots – positioned on the zoomed canvas */}
        <div className="absolute inset-0">
          {place.hotspots.map((hotspot, index) => (
            <HotspotButton
              key={hotspot.id}
              hotspot={hotspot}
              displayLabel={
                hotspot.type === "product"
                  ? getProductByHandle((hotspot as ProductHotspot).productHandle)?.title
                  : hotspot.type === "accolade"
                    ? getProductByHandle((hotspot as AccoladeHotspot).productHandle)?.title
                    : undefined
              }
              animationDelay={0.35 + index * 0.07}
              expandedHotspot={expandedHotspot}
              disableHover={isDragging}
              onHotspotHoverIn={(id) => {
                if (collapseTimerRef.current) {
                  clearTimeout(collapseTimerRef.current);
                  collapseTimerRef.current = null;
                }
                setExpandedHotspot(id);
              }}
              onHotspotHoverOut={() => {
                if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
                collapseTimerRef.current = setTimeout(() => {
                  setExpandedHotspot(null);
                  collapseTimerRef.current = null;
                }, 200);
              }}
              onHotspotClick={(h) => {
                if (expandedHotspot === h.id) {
                  if (collapseTimerRef.current) {
                    clearTimeout(collapseTimerRef.current);
                    collapseTimerRef.current = null;
                  }
                  if (h.type === "room") {
                    onRoomNavigate?.(h.target);
                  } else if (h.type === "accolade") {
                    setExpandedHotspot(null);
                    onAccoladeClick?.((h as AccoladeHotspot).productHandle);
                  } else {
                    setExpandedHotspot(null);
                    onProductClick((h as ProductHotspot).productHandle);
                  }
                } else {
                  if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
                  setExpandedHotspot(h.id);
                  collapseTimerRef.current = setTimeout(() => {
                    setExpandedHotspot(null);
                    collapseTimerRef.current = null;
                  }, LABEL_DURATION_MS);
                }
              }}
            />
          ))}
        </div>
      </div>
      {/* Back button – fixed bubble */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="fixed bottom-8 left-10 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg animate-pulse-ring"
          style={{ bottom: "calc(2rem + env(safe-area-inset-bottom, 0px))" }}
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}
    </div>
  );
}
