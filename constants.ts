import { ListingData } from './types';

// Deterministic data provided in the prompt
export const SAMPLE_DATA: ListingData = {
  "itemId": "proto-001",
  "images": [
    {"url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop", "label": "Front"},
    {"url": "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop", "label": "Back"},
    {"url": "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000&auto=format&fit=crop", "label": "Box"}
  ],
  "vision": {
    "makeModel": {"value": "Sony WH-1000XM4", "confidence": 0.94},
    "color": {"value": "Black", "confidence": 0.92},
    "defects": [{"type": "ear_cushion_wear", "severity": "minimal", "confidence": 0.78}],
    "includesBox": {"value": true, "confidence": 0.88},
    "accessories": [{"value": "charging cable", "confidence": 0.74}]
  },
  "category": "Electronics > Audio > Headphones",
  "title": "Sony WH-1000XM4 Noise Cancelling Headphones – Black",
  "attributes": {
    "color": "Black",
    "condition": "Excellent",
    "visibleDefects": ["Minimal ear cushion wear"],
    "includesBox": true,
    "accessories": ["Charging cable"]
  },
  "description": "Selling my Sony WH-1000XM4. Excellent condition with minimal ear cushion wear. Includes original box. Great active noise cancellation.",
  "pricing": {
    "fastSell": 14500,
    "maxValue": 16000,
    "default": 15500,
    "confidence": "High",
    "provenance": "Median of last 50 sold in Mumbai"
  },
  "ui": {
    "actions": ["Post Now", "Edit Fields", "Add More Photos"],
    "badges": ["Auto-detected", "Photo-verified"],
    "tooltips": {
      "pricing": "We analyze recent local sales for similar items.",
      "title": "Clear, searchable titles attract more buyers."
    }
  }
};

export const TITLE_VARIANTS = [
  "Sony WH-1000XM4 Noise Cancelling Headphones – Black",
  "Sony WH-1000XM4 Wireless Headphones (Black) - Good Condition",
  "Used Sony WH-1000XM4 - Active Noise Cancelling"
];

export const CATEGORY_HIERARCHY = [
  "Electronics > Audio > Headphones",
  "Electronics > Audio > Accessories",
  "Electronics > Headphones > Wireless"
];