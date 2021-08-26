import styled from '@lib/styled-components';
import Carousel from '@components/Carousel';
import ProductList from '@components/ProductList';
import ProductBannerList from '@components/ProductBannerList';
import Loading from '@components/Loading';
import { IMainBlock } from '@types';
import { useMainPage } from '@hooks/query/products';

const mainBlock = (block: IMainBlock, idx: number) => {
  const sectionKey = `home-section-${idx}`;
  switch (block.type) {
    case 'slide-banner':
      return <Carousel items={block.banners} carouselWidth={'100vw'} key="home-slide" />;
    case 'product-list':
      return (
        <section key={sectionKey}>
          <div className="home-product-list">
            <h3>{block.title}</h3>
            <ProductList products={block.products} />
          </div>
        </section>
      );
    case 'product-banner-list':
      return (
        <section key={sectionKey}>
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
    return <Loading />;
  }

  return <HomeContents>{data && data.map((block, idx) => mainBlock(block, idx))}</HomeContents>;
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
