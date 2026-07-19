export interface CakeItem {
  id: string;
  name: string;
  description: string;
  category: 'wedding' | 'chocolate' | 'minimalist' | 'botanical';
  image: string;
  priceEst: string;
  flavors: string[];
  servings: string;
  features: string[];
}

export type CakeCategory = 'all' | 'wedding' | 'chocolate' | 'minimalist' | 'botanical';

export interface OrderDetails {
  cakeType: string;
  size: string; // e.g., "1-tier (12-15 servings)", "2-tiers (25-30 servings)" etc.
  flavor: string;
  filling: string;
  designTheme: string;
  dateNeeded: string;
  specialNotes: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}
