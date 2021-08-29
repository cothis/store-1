export const toPriceText = (price?: number | string) => {
  if (!price) return;
  if (typeof price == 'string') price = Number(price);
  return price.toLocaleString() + '원';
};

export const toAvailablePriceText = (price?: string | number, originalPrice?: string | number) => {
  return toPriceText(price || originalPrice);
};
