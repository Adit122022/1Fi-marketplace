export interface Variant {
  id: string;
  color: string;
  storage: string;
  priceModifier: number;
}

export interface EMIOption {
  id: string;
  provider: string;
  tenureMonths: number;
  monthlyEMI: number;
  interestRate: number; // e.g. 15 for 15%
  processingFee: number;
  totalAmount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  images: string[];
  basePrice: number;
  variants: Variant[];
  description: string;
  specs: Record<string, string>;
  emiOptions: EMIOption[];
  isNew?: boolean;
}
