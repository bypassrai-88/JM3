# Interactive Shop – Project Notes & Reference

*Last updated: Feb 12, 2025*

---

## 1. Vision (What We’re Building)

- **Entry**: Exclusive front page with **Enter**; fancy animation brings you into the experience.
- **Clubhouse**: Golf club living room (hub); choose **Trophy Room** or **Golf Simulator**.
- **Trophy Room**: Showcase room for athlete accolades (not a store).
- **Golf Simulator**: Scrollable golf room where you can **select golf items** and add to cart.
- **Items**: Click an item → **glass-style popup** with product info → **Add to cart** → close and keep exploring. Full e‑commerce: cart + checkout.
- **Content**: Placeholder images/items for now; everything should be **easy to swap** later (our own images, items, rooms, places).

**Platform**: Web only.

---

## 2. Stack Choice – Recommendation

### Backend: **Shopify**

- **Why**: You want full e‑commerce (cart + checkout). Shopify gives you products, inventory, cart, checkout, and payments out of the box. No need to build payments or tax logic.
- **Content**: Products, collections, and media live in Shopify Admin. You can change images, add/remove items, and organize everything there. No code needed for day-to-day updates.

### Frontend: **Next.js (React) + Tailwind CSS**

- **Why**:
  - **Next.js**: Fast, good for SEO, easy routing (e.g. `/rooms/front-yard`, `/rooms/kitchen`). Works well with a headless Shopify storefront.
  - **React**: Great for interactive UIs (hotspots, modals, cart sidebar). Component-based so we can reuse “room viewer,” “glass popup,” “cart” everywhere.
  - **Tailwind**: Quick, consistent styling and that “glass” (glassmorphism) look for the product popup.
- **Headless**: Frontend talks to Shopify via **Storefront API** (GraphQL). We control the full look and feel and interaction; Shopify handles products, cart, and checkout (including redirect to Shopify-hosted checkout or Checkout Extensibility if we want).

### Summary

| Layer        | Choice              | Role                                      |
|-------------|---------------------|-------------------------------------------|
| **E‑commerce** | Shopify             | Products, cart, checkout, payments        |
| **Frontend**   | Next.js + React     | Pages, routing, room viewer, hotspots     |
| **Styling**    | Tailwind CSS        | Layout, glass popup, responsive design    |
| **API**        | Shopify Storefront API | Fetch products, add to cart, create checkout |

**Alternative considered**: Building cart/checkout ourselves (e.g. Stripe) would be more work and duplicate what Shopify already does. For “full e‑commerce” + “easy to manage content,” Shopify is the best fit.

---

## 3. Content Model (Places You Look Around + Select Things)

We need a simple, flexible way to describe **where** users are and **what** they can click.

### 3.1 Places (Rooms / Areas)

- **Front** – landing “Enter” page (optional: minimal or no hotspots).
- **Clubhouse** – first explorable area (golf club living room); hotspots to Trophy Room and Golf Simulator.
- **Rooms** – Trophy Room (showcase), Golf Simulator (store). Each is one “scene.”

**Data we need per place:**

| Field           | Purpose                                      |
|----------------|----------------------------------------------|
| `id` / `slug`  | Unique key (e.g. `front-yard`, `kitchen`)    |
| `name`         | Display name                                 |
| `backgroundImage` | Full-scene image URL (easy to replace)   |
| `hotspots`     | List of clickable regions (see below)        |

**Where to store**: Either in the codebase (e.g. JSON/TS file) or in Shopify (e.g. Metaobjects or a simple CMS). Starting in **JSON in the repo** keeps it simple and still easy to edit; we can move to CMS later if you want non-devs to edit.

### 3.2 Hotspots (What You Can Click)

Each hotspot is a **clickable zone** on a place’s image. Two types:

1. **Room link** – goes to another place (e.g. “Enter Kitchen”).
2. **Product** – opens the glass popup; product data comes from Shopify (by product ID or handle).

**Data per hotspot:**

| Field        | Purpose                                      |
|-------------|----------------------------------------------|
| `id`        | Unique in that room (for keys)               |
| `type`      | `"room"` or `"product"`                      |
| `target`    | Room slug or Shopify product handle          |
| `position`  | Where on the image (e.g. `{ x: 20, y: 30 }` in % or px) |
| `label`     | Optional text (e.g. “Enter Kitchen”)         |
| `shape`     | Optional: circle vs rectangle (for hit area)  |

**Responsive**: Store positions in **percent** so the same data works on different screen sizes. We can support one shape per hotspot (e.g. circle with radius % or rect with width/height %).

### 3.3 Products (Items in Rooms)

- **Stored in Shopify only.**  
- We don’t duplicate product data; we only store **which product** each product hotspot points to (e.g. `productHandle: "views-hoodie"`).
- Popup shows: title, price, image, description, variant picker (if any), **Add to cart**. All from Storefront API.

### 3.4 Why This Model Works

- **Look around**: Each “place” is one background image + a list of hotspots. Adding a new room = new image + new hotspot list.
- **Select things**: Product hotspots = “click here to see this Shopify product and add to cart.” Easy to add/remove/move items by editing hotspot data and products in Shopify.
- **Easy to swap content**: Change `backgroundImage` URL (or replace file); add/remove hotspots; in Shopify, add/remove products or replace images. No hardcoded content.

---

## 4. Design (Key Behaviors)

### 4.1 Flow

1. **Front page** → single compelling frame + “Enter” (button or hotspot).
2. **Front yard** → big scene image; hotspots to enter rooms (and optionally 1–2 featured products).
3. **Room** → same idea: scene image + room links + product hotspots.
4. **Click product** → **glass-style modal** (blurred background, card with product info, Add to cart, keep browsing).
5. **Cart** → persistent cart (e.g. icon + count); click to see cart drawer/page; checkout via Shopify.

### 4.2 Glass Popup (Product Modal)

- **Look**: Frosted glass (backdrop blur), rounded corners, subtle border/shadow so it feels like a “floating card.”
- **Content**: Product image, title, price, short description, variant selector (if needed), **Add to cart**.
- **Behavior**: Add to cart → optional short confirmation → close or “Keep shopping.” No full-page redirect; user stays in the same room.

### 4.3 Easy Content Updates

- **Images**: All scene images and product images referenced by URL or path. Replace files or update URLs to swap in your own.
- **Rooms/places**: Add/edit/remove entries in our places + hotspots config (JSON or CMS).
- **Items**: Add/edit in Shopify; link them in hotspots by product handle. No code change needed for new products.

---

## 5. Implementation Outline

### Phase 1 – Foundation

1. **Repo & stack**
   - Next.js app, Tailwind, TypeScript.
   - Shopify store (development store is fine); install/store Storefront API credentials.
2. **Shopify connection**
   - Use Storefront API (GraphQL) for: fetch product by handle, add line items to cart, get cart, create checkout URL.
   - Optional: use a small lib (e.g. `@shopify/hydrogen` or `shopify-buy`) to simplify cart if we want.
3. **Content model in code**
   - Define types: `Place`, `Hotspot`, `RoomLinkHotspot`, `ProductHotspot`.
   - One JSON (or TS) file per place or one `places.json` with all rooms; include placeholder image URLs and a few sample hotspots.

### Phase 2 – Core Experience

4. **Front page**
   - Single full-screen (or hero) image + “Enter” that routes to front yard (e.g. `/rooms/front-yard`).
5. **Place viewer (reusable)**
   - Component: full-screen (or large) background image + overlay that renders hotspots (positioned by %). Click room → navigate to that place; click product → open product modal.
6. **Hotspot system**
   - Render hotspots from `position` (and optional `shape`); wire room vs product actions. Make it responsive (same % works on mobile/desktop).
7. **Product popup (glass)**
   - Modal component: fetch one product by handle (Storefront API), show image, title, price, description, Add to cart. Style with Tailwind (backdrop blur, rounded, shadow). On add-to-cart, update cart and show brief feedback.

### Phase 3 – E‑commerce & Polish

8. **Cart**
   - Cart state (from Shopify cart ID in cookie/localStorage); cart icon + count in header/shell; mini cart drawer or cart page with line items and link to checkout.
9. **Checkout**
   - Redirect to Shopify checkout (or use Shopify’s embedded/extension options if we want to stay on our domain later).
10. **Content swap**
    - Document: how to change background images, add/remove rooms, add/remove hotspots, add products in Shopify and link them. Keep placeholder assets in a clear folder (e.g. `/public/places/`, `/public/placeholders/`).

### Phase 4 – Optional Later

- Transitions between rooms (e.g. fade/slide).
- Multiple images per room (e.g. simple panorama or multi-angle).
- Analytics (which rooms/items get clicks).

---

## 6. What I Think Is Best (Summary)

- **Stack**: **Next.js + Tailwind + Shopify (headless)** – best balance of “cool interactive site” and “full e‑commerce” without building payments. Easy to make it your own visually and interaction-wise.
- **Content model**: **Places + hotspots (room links + product handles)**. Simple, flexible, and easy to edit; products live in Shopify, so adding/editing items is straightforward.
- **Design**: **Enter → front yard → rooms → click item → glass popup → add to cart → keep exploring.** Keeps the vibe you want and stays manageable.
- **Easy content**: Placeholder images and JSON-driven places/hotspots now; clear docs and file structure so swapping in your own images, items, and rooms is straightforward later.

Use this doc as the single source of truth for model, stack, and design as we build. We can adjust sections (e.g. add more room types or change popup behavior) as we go.
