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
