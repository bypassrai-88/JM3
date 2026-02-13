/**
 * Content model types – easy to extend when adding your own rooms, items, etc.
 */

export type HotspotType = "room" | "product" | "accolade";

export interface HotspotPosition {
  x: number; // percentage 0–100
  y: number; // percentage 0–100
  width?: number; // optional width % for rect
  height?: number; // optional height % for rect
}

export interface BaseHotspot {
  id: string;
  type: HotspotType;
  position: HotspotPosition;
  label?: string;
}

export interface RoomHotspot extends BaseHotspot {
  type: "room";
  target: string; // room slug
}

export interface ProductHotspot extends BaseHotspot {
  type: "product";
  productHandle: string; // Shopify product handle (or mock id for now)
}

export interface AccoladeHotspot extends BaseHotspot {
  type: "accolade";
  productHandle: string; // handle for accolade content (title, description, image)
}

export type Hotspot = RoomHotspot | ProductHotspot | AccoladeHotspot;

export interface Place {
  id: string;
  slug: string;
  name: string;
  backgroundImage: string;
  hotspots: Hotspot[];
}
