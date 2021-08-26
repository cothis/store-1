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

export enum OrderStatus {
  TEMP = 'temp',
  READY = 'ready',
  ACCEPTED = 'accepted',
  DELIVERING = 'delivering',
  DONE = 'done',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

export interface IOrder {
  id: string;
  status: OrderStatus;
  senderName: string;
  senderCall: string;
  senderPhone: string;
  senderMail: string;
  receiverName: string;
  receiverCall: string;
  receiverPhone: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  message: string;
}

export interface ICategory {
  id: string;
  title: string;
  children: ICategory[];
}

export interface IBanner {
  imageUrl: string;
  title: string;
  description?: string;
  productId: string;
}

export interface ISlideBanner {
  type: 'slide-banner';
  banners: IBanner[];
}

export interface IProductList {
  type: 'product-list';
  title: string;
  products: IProductListItem[];
}

export interface IProductBannerList {
  type: 'product-banner-list';
  title: string;
  banners: IBanner[];
}

export type IMainBlock = ISlideBanner | IProductList | IProductBannerList;

export type Term = '/agreement' | '/privacy';
