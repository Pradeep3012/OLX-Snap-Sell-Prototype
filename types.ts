export interface ListingImage {
  url: string;
  label: string;
}

export interface VisionData {
  makeModel: { value: string; confidence: number };
  color: { value: string; confidence: number };
  defects: { type: string; severity: string; confidence: number }[];
  includesBox: { value: boolean; confidence: number };
  accessories: { value: string; confidence: number }[];
}

export interface PricingData {
  fastSell: number;
  maxValue: number;
  default: number;
  confidence: string;
  provenance: string;
}

export interface ListingData {
  itemId: string;
  images: ListingImage[];
  vision: VisionData;
  category: string;
  title: string;
  attributes: {
    color: string;
    condition: string;
    visibleDefects: string[];
    includesBox: boolean;
    accessories: string[];
  };
  description: string;
  pricing: PricingData;
  ui: {
    actions: string[];
    badges: string[];
    tooltips: {
      pricing: string;
      title: string;
    };
  };
}

export enum AppStage {
  HOME = 'HOME',
  CAMERA = 'CAMERA',
  SCANNING = 'SCANNING',
  PREVIEW = 'PREVIEW',
  SUCCESS = 'SUCCESS',
}

export type CaptureStep = 'Front' | 'Back' | 'Box';