import { ProductBanner } from '../entities/product-banner.entity';
import { Product } from '../entities/product.entity';

type MainBlockType = 'slide-banner' | 'product-list' | 'product-banner-list';

export class MainBlock {
  type: MainBlockType;
}

export class SlideBannerBlock extends MainBlock {
  constructor() {
    super();
    this.type = 'slide-banner';
  }

  banners: ProductBanner[];
}

export class ProductListBlock extends MainBlock {
  constructor() {
    super();
    this.type = 'product-list';
  }

  title: string;
  products: Product[];
}

export class ProductBannerListBlock extends MainBlock {
  constructor() {
    super();
    this.type = 'product-banner-list';
  }

  title: string;
  banners: ProductBanner[];
}
