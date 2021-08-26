import styled from '@lib/styled-components';
import Carousel from '@components/Carousel';
import ProductList from '@components/ProductList';
import ProductBannerList from '@components/ProductBannerList';
import { IMainBlock } from '@types';
import { useMainPage } from '@hooks/query/products';

const mainBlock = (block: IMainBlock) => {
  switch (block.type) {
    case 'slide-banner':
      return <Carousel items={block.banners} carouselWidth={'100vw'} />;
    case 'product-list':
      return (
        <section>
          <div className="home-product-list">
            <h3>{block.title}</h3>
            <ProductList products={block.products} />
          </div>
        </section>
      );
    case 'product-banner-list':
      return (
        <section>
          <div className="home-product-list">
            <h3>{block.title}</h3>
            <ProductBannerList banners={block.banners} />
          </div>
        </section>
      );
  }
};

function Home() {
  const { isLoading, isError, error, data } = useMainPage();

  if (isError) {
    throw error;
  }

  if (isLoading) {
    return <div>로딩</div>;
  }

  return <HomeContents>{data && data.map(mainBlock)}</HomeContents>;
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
