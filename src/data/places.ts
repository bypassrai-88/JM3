/**
 * Places & hotspots – swap images and add rooms here.
 */

import type { Place } from "@/lib/types";

export const places: Place[] = [
  {
    id: "clubhouse",
    slug: "clubhouse",
    name: "Clubhouse",
    backgroundImage: "/clubhouse.png?v=2",
    hotspots: [
      {
        id: "trophy-room",
        type: "room",
        target: "trophy-room",
        position: { x: 10, y: 55 },
        label: "Trophy Room",
      },
      {
        id: "golf-simulator",
        type: "room",
        target: "golf-simulator",
        position: { x: 90, y: 55 },
        label: "Golf Simulator",
      },
    ],
  },
  {
    id: "trophy-room",
    slug: "trophy-room",
    name: "Trophy Room",
    backgroundImage: "/trophy-room.png?v=2",
    hotspots: [
      {
        id: "accolade-1",
        type: "accolade",
        productHandle: "accolade-1",
        position: { x: 25, y: 50 },
      },
      {
        id: "accolade-2",
        type: "accolade",
        productHandle: "accolade-2",
        position: { x: 50, y: 50 },
      },
      {
        id: "accolade-3",
        type: "accolade",
        productHandle: "accolade-3",
        position: { x: 75, y: 50 },
      },
    ],
  },
  {
    id: "golf-simulator",
    slug: "golf-simulator",
    name: "Golf Simulator",
    backgroundImage: "/golf-simulator.png?v=2",
    hotspots: [
      {
        id: "product-driver",
        type: "product",
        productHandle: "premium-driver",
        position: { x: 35, y: 55 },
      },
      {
        id: "product-putter",
        type: "product",
        productHandle: "limited-putter",
        position: { x: 55, y: 45 },
      },
      {
        id: "product-golf-balls",
        type: "product",
        productHandle: "pro-golf-balls",
        position: { x: 75, y: 60 },
      },
      {
        id: "product-golf-bag",
        type: "product",
        productHandle: "tour-golf-bag",
        position: { x: 25, y: 75 },
      },
    ],
  },
];
