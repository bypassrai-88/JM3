"use client";

import { usePathname } from "next/navigation";
import { NavMenu } from "./NavMenu";
import { CartButton } from "./CartButton";

export function AppHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-3 flex justify-between items-center">
      <NavMenu />
      <CartButton />
    </header>
  );
}
