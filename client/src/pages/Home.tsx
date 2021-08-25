import styled from '@lib/styled-components';
import Carousel, { ICarouselItem } from '@components/Carousel';
import ProductList from '@components/ProductList';
import ProductBannerList, { IBanner } from '@components/ProductBannerList';
import bannerOne from '@assets/images/banner_one.gif';
import bannerTwo from '@assets/images/banner_two.gif';
import bannerThree from '@assets/images/banner_three.gif';
import productThumbOne from '@assets/images/product_one.png';
import productThumbTwo from '@assets/images/product_two.png';
import productThumbThree from '@assets/images/product_three.jpeg';
import productBannerOne from '@assets/images/product_banner_one.png';
import productBannerTwo from '@assets/images/product_banner_two.png';
import { IProductListItem } from '@types';

interface IProductList {
  title: string;
  products: IProductListItem[];
}

interface IProductBanners {
  title: string;
  banners: IBanner[];
}

const slideBanner: ICarouselItem[] = [
  {
    imageUrl: bannerOne,
    url: '/products/1',
    title: '텀블러백',
  },
  {
    imageUrl: bannerTwo,
    url: '/products/2',
    title: '맥주짠 세트',
  },
  {
    imageUrl: bannerThree,
    url: '/products/3',
    title: '흑심있어요',
  },
];
const productMock: IProductListItem[] = [
  {
    id: '1',
    title: '잘나가요 세트',
    price: 15000,
    tags: ['best', 'new'],
    like: false,
    imageUrl: productThumbOne,
  },
  {
    id: '2',
    title: '안보이는 양말 세트',
    originalPrice: 20000,
    tags: ['green', 'sale'],
    price: 19000,
    like: true,
    imageUrl: productThumbTwo,
  },
  {
    id: '3',
    title: '피규어. 독고배달이',
    priceText: '0원, 마음껏 쓰세용',
    tags: ['soldout'],
    like: false,
    imageUrl: productThumbThree,
  },
];

const bestProducts: IProductList = {
  title: '잘나가요',
  products: Array.from({ length: 4 }, (_, idx) => productMock[idx % 3]),
};
const newProducts: IProductList = {
  title: '새로 나왔어요',
  products: Array.from({ length: 8 }, (_, idx) => productMock[idx % 3]),
};
const saleProducts: IProductList = {
  title: '지금은 할인 중',
  products: Array.from({ length: 8 }, (_, idx) => productMock[idx % 3]),
};
const mainBanners: IProductBanners = {
  title: '선물하기 딱 좋아요',
  banners: [
    {
      imageUrl: productBannerOne,
      title: '효자손은 과학이다.',
      description: '시원하게 긁어드려요',
      productId: '3',
    },
    {
      imageUrl: productBannerTwo,
      title: '꼭꼭 숨어라',
      description: 'ㅋㅋ안 보이는 양말세트',
      productId: '5',
    },
  ],
};

function Home() {
  return (
    <HomeContents>
      <Carousel items={slideBanner} carouselWidth={'100vw'} />
      <section>
        <div className="home-product-list">
          <h3>{bestProducts.title}</h3>
          <ProductList products={bestProducts.products} />
        </div>
      </section>
      <section>
        <div className="home-product-list">
          <h3>{newProducts.title}</h3>
          <ProductList products={newProducts.products} />
        </div>
      </section>
      <section>
        <div className="home-product-list">
          <h3>{mainBanners.title}</h3>
          <ProductBannerList banners={mainBanners.banners} />
        </div>
      </section>
      <section>
        <div className="home-product-list">
          <h3>{saleProducts.title}</h3>
          <ProductList products={saleProducts.products} />
        </div>
      </section>
    </HomeContents>
  );
}

const HomeContents = styled.div`
  > section {
    width: 100%;
    &:nth-child(2n + 1) {
      background-color: #fcfcf7;
    }
  }
  .home-product-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 1rem;
    > h3 {
      font-family: 'Do Hyeon', sans-serif;
      font-size: 2rem;
      padding-bottom: 1.5em;
    }
  }
`;

export default Home;
