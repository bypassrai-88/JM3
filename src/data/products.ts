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
    handle: "premium-golf-polo",
    title: "Premium Golf Polo",
    description: "Classic white golf polo in breathable moisture-wicking fabric. Premium cotton blend for comfort on and off the course.",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=95&auto=format",
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
    title: "PBA Champion",
    description: "2022–23 PBA Commissioner's Cup champion with Barangay Ginebra San Miguel. Part of the title run alongside Justin Brownlee, Japeth Aguilar, and Scottie Thompson.",
    price: "",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&q=95&auto=format",
  },
  {
    id: "6",
    handle: "accolade-2",
    title: "PBA Mythical First Team & All-Star",
    description: "PBA Mythical First Team selection (2022–23 season). Two-time PBA All-Star (2023, 2024). PBA All-Rookie Team (2021). Career averages of 13.9 PPG, 6.9 RPG, and 2.3 APG.",
    price: "",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&q=95&auto=format",
  },
  {
    id: "7",
    handle: "accolade-3",
    title: "Gilas Pilipinas & FIBA World Cup",
    description: "Member of the Philippines national team at the 2023 FIBA World Cup. SEA Games gold medalist. Drafted 2nd overall in the 2021 PBA draft. UAAP Mythical Team at De La Salle (2019).",
    price: "",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&q=95&auto=format",
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}
