/**
 * Mock products – replace with Shopify Storefront API when ready.
 * Golf items for the Golf Simulator room.
 */

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    handle: "premium-driver",
    title: "Premium Driver",
    description: "Tour-level driver engineered for maximum distance and forgiveness. Carbon fiber crown with titanium face.",
    price: "$549.00",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=95&auto=format",
  },
  {
    id: "2",
    handle: "limited-putter",
    title: "Limited Edition Putter",
    description: "Hand-finished milled putter with precision weighting. Designed for consistent roll and feel.",
    price: "$399.00",
    image: "https://images.unsplash.com/photo-1593111774240-d529f12bb716?w=1200&q=95&auto=format",
  },
  {
    id: "3",
    handle: "pro-golf-balls",
    title: "Pro Golf Balls (Dozen)",
    description: "Tour-caliber 3-piece urethane cover. Exceptional spin control and durability around the greens.",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&q=95&auto=format",
  },
  {
    id: "4",
    handle: "tour-golf-bag",
    title: "Tour Golf Bag",
    description: "Lightweight stand bag with 14-way divider. Premium materials and ergonomic dual straps.",
    price: "$299.00",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=1200&q=95&auto=format",
  },
  {
    id: "5",
    handle: "accolade-1",
    title: "Accolade 1",
    description: "To be specified.",
    price: "",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&q=95&auto=format",
  },
  {
    id: "6",
    handle: "accolade-2",
    title: "Accolade 2",
    description: "To be specified.",
    price: "",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&q=95&auto=format",
  },
  {
    id: "7",
    handle: "accolade-3",
    title: "Accolade 3",
    description: "To be specified.",
    price: "",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&q=95&auto=format",
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}
