export interface ICart {
  imageUrl: string;
  id: string;
  title: string;
  originalPrice?: number;
  price: number;
  count: number;
}

export type Tag = 'best' | 'green' | 'new' | 'sale' | 'soldout' | 'disabled';
export interface IProductListItem {
  id: string;
  title: string;
  priceText?: string;
  originalPrice?: number;
  price?: number;
  tags?: Tag[];
  like: boolean;
  imageUrl: string;
}
