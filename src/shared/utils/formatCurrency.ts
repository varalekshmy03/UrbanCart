export const USD_TO_INR = 92;

export const formatCurrency = (value: number, currency = 'INR'): string => {
  const displayValue = currency === 'INR' ? value * USD_TO_INR : value;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(displayValue);
};

export const calculateSalePrice = (price: number, discountPercentage: number): number =>
  discountPercentage > 0
    ? Math.round(price * (1 - discountPercentage / 100) * 100) / 100
    : price;
