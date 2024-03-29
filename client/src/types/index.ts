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
  NULL = 'null',
  TEMP = 'temp',
  READY = 'ready',
  ACCEPTED = 'accepted',
  DELIVERING = 'delivering',
  DONE = 'done',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

export interface IOrderHasProduct {
  id: string;
  quantity: number;
  product: IProductListItem;
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
  createAt: Date;
  updateAt: Date;
  orderHasProducts: IOrderHasProduct[];

  productsPrice: number;
  deliveryFee: number;
  paymentPrice: number;
}

export interface IOrderWithPage {
  orders: IOrder[];
  page: {
    count: number;
    totalPage: number;
  };
}

export interface CreateOrderDto {
  products: {
    id: string;
    quantity: number;
  }[];
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

export interface User {
  id: string;
  name: string;
  loginId: string;
  email: string;
  zipcode: string;
  address: string;
  addressDetail: string;
}

export interface IBoardUser {
  id: string;
  name: string;
}

export interface IBoard {
  id: string;
  slug: 'notice' | 'review' | 'question';
  title: string;
  contents: IBoardContent[];
  currentPage: number;
  totalPage: number;
  totalCount: number;
}

export interface IBoardContent {
  id: string;
  title: string;
  content: string;
  date: Date | string; // Date.prototype.toISOString()
  user: IBoardUser;
  comments: IBoardComment[];
  product?: IProductListItem;
}

export interface IBoardComment {
  id: string;
  content: string;
  user: IBoardUser;
}

export interface IBoardPostBody {
  title: string;
  content: string;
}

export type BoardType = 'reviews' | 'questions' | 'notice';
export interface IRecentProduct {
  id: string;
  imageUrl: string;
}

export interface ProductIdAndTitle {
  id: string;
  title: string;
}

export type SortKeyword = 'popular' | 'latest' | 'low-price' | 'high-price ';

export interface ProductListPage {
  categoryId?: string;
  sort?: SortKeyword;
  keyword?: string;
  totalPage: number;
  currentPage: number;
  totalCount: number;
  categoryName?: string;
  products: IProductListItem[];
}

export interface ProductDetail extends IProductListItem {
  content: string[];
  detailInfo: [string, string][];
  recommends: IProductListItem[];
}
