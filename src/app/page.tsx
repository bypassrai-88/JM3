"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => router.push("/rooms/clubhouse"), 900);
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center bg-neutral-950 overflow-hidden transition-all duration-700 ${
        isExiting ? "animate-enter-exit" : ""
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src="/entrance.png?v=2"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={95}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      <div
        className={`relative z-10 text-center px-6 transition-all duration-500 ${
          isExiting ? "opacity-0 scale-95" : ""
        }`}
        style={
          !isExiting
            ? { animation: "fade-in 1s ease-out 0.3s forwards", opacity: 0 }
            : undefined
        }
      >
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-6 font-light">
          By Invitation Only
        </p>
        <h1 className="text-5xl md:text-7xl font-light text-white tracking-[0.02em] mb-8 drop-shadow-2xl">
          JM3
        </h1>
        <button
          onClick={handleEnter}
          disabled={isExiting}
          className="group relative px-14 py-4 rounded-sm border border-white/40 bg-white/5 text-white font-light text-sm tracking-widest uppercase hover:bg-white/15 hover:border-white/60 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10">Enter</span>
          <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
        </button>
      </div>
      {!isExiting && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent"
          style={{ animation: "fade-in 1.5s ease-out 1s forwards", opacity: 0 }}
        />
      )}
    </main>
  );
}
