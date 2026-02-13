import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Interactive Shop",
  description: "Explore rooms and discover items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <AppHeader />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
