export const API_BASE_URL = 'https://dummyjson.com';
export const DEBOUNCE_MS = 400;
export const FEATURED_COUNT = 6;
export const SORT_OPTIONS = [
  { value: 'none', label: 'Relevance' },
  { value: 'asc', label: 'Price: low to high' },
  { value: 'desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Rating: high to low' },
] as const;

export const EXCLUDED_PRODUCT_CATEGORIES = new Set([
  'groceries',
  'grocery',
  'vehicle',
  'vehicles',
  'automotive',
  'motorcycle',
  'motorcycles',
]);

export const isExcludedProductCategory = (category: string) =>
  EXCLUDED_PRODUCT_CATEGORIES.has(category.trim().toLowerCase());
