"use client";

import { useRouter } from "next/navigation";
import type { Hotspot } from "@/lib/types";

interface HotspotButtonProps {
  hotspot: Hotspot;
  displayLabel?: string;
  onClick?: () => void;
  onRoomNavigate?: (target: string) => void;
  onHotspotClick?: (hotspot: Hotspot) => void;
  expandedHotspot?: string | null;
  animationDelay?: number;
}

export function HotspotButton({
  hotspot,
  displayLabel,
  onClick,
  onRoomNavigate,
  onHotspotClick,
  expandedHotspot = null,
  animationDelay = 0,
}: HotspotButtonProps) {
  const router = useRouter();
  const { position } = hotspot;
  const left = `${position.x}%`;
  const top = `${position.y}%`;
  const isExpanded = expandedHotspot === hotspot.id;

  const label =
    displayLabel ??
    (hotspot.type === "room"
      ? hotspot.label ?? `Enter ${hotspot.target}`
      : hotspot.label ?? "View item");

  const handleClick = () => {
    if (onHotspotClick) {
      onHotspotClick(hotspot);
    } else if (hotspot.type === "room") {
      router.push(`/rooms/${hotspot.target}`);
    } else if (onClick) {
      onClick();
    }
  };

  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    left,
    top,
    transform: "translate(-50%, -50%)",
    animation: "hotspot-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
    animationDelay: `${animationDelay}s`,
    opacity: 0,
  };

  return (
    <div style={wrapperStyle} className="flex items-center justify-center">
      <button
        type="button"
        className={`flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/20 text-white text-xs font-medium backdrop-blur-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg ${
          isExpanded
            ? "px-4 py-2 min-w-[4rem] hover:bg-white/30 hover:border-white/40"
            : "w-5 h-5 p-0 border-2 hover:scale-125 animate-pulse-ring"
        }`}
        onClick={handleClick}
        aria-label={isExpanded ? label : "View hotspot"}
      >
      {isExpanded ? (
        <span className="whitespace-nowrap animate-fade-in">{label}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
      </button>
    </div>
  );
}
