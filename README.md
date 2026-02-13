# Interactive Shop

Exclusive golf club experience. Enter → Clubhouse (living room) → Trophy Room (showcase) or Golf Simulator (golf shop). Scroll around rooms, click items to add to cart.

## Stack

- **Next.js** (React) + **Tailwind CSS**
- **Shopify** (headless) – ready to connect when you add your store
- Mock products & cart for now

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/
│   ├── page.tsx          # Front page ("Enter")
│   ├── rooms/[slug]/     # Dynamic room pages
│   └── checkout/         # Checkout (placeholder for Shopify)
├── components/           # PlaceViewer, HotspotButton, ProductPopup, CartButton
├── context/              # CartContext (cart state)
├── data/
│   ├── places.ts         # Rooms + hotspots (swap images, add rooms here)
│   └── products.ts       # Mock products (replace with Shopify later)
└── lib/types.ts          # TypeScript types for places & hotspots
```

## Adding your own content

1. **Rooms & images**  
   Edit `src/data/places.ts`. Change `backgroundImage` URLs to your own. Add new places and hotspots.

2. **Products**  
   Edit `src/data/products.ts` for mock data. When you connect Shopify, products will come from the Storefront API instead.

3. **Styles**  
   Tailwind classes throughout. Adjust in components or extend `tailwind.config.ts`.

See `NOTES.md` for the full design & content model.
