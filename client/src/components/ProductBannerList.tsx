import styled from '@lib/styled-components';
import Link from '@lib/router/Link';

export interface IBanner {
  imageUrl: string;
  title: string;
  description: string;
  productId: string;
}

function ProductBannerList({ banners }: { banners: IBanner[] }) {
  return (
    <BannerList>
      {banners.map((banner) => {
        return (
          <Link key={banner.title} to={`/products/${banner.productId}`}>
            <div className="banner-wrapper">
              <div className="banner-img">
                <img src={banner.imageUrl} alt={banner.title} />
              </div>
              <div className="banner-info">
                <p className="banner-title">{banner.title}</p>
                <p className="banner-description">{banner.description}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </BannerList>
  );
}

const BannerList = styled.div`
  .banner-wrapper {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 1rem 0;
    &:hover {
      .banner-img > img {
        transform: scale(1.1);
      }
    }
    .banner-img {
      overflow: hidden;
      border-radius: 5px;
      > img {
        transition: 0.3s;
        width: 100%;
      }
    }
    .banner-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      > .banner-title {
        font-family: 'Do Hyeon', sans-serif;
        font-size: 1.7rem;
        margin-bottom: 0.5em;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.media.medium}) {
    .banner-wrapper {
      display: block;
      .banner-img {
        height: 200px;
        > img {
          height: 100%;
          object-fit: cover;
        }
      }
      .banner-info {
        align-items: flex-start;
        margin: 1.5rem 0 3rem 0;
      }
    }
  } ;
`;

export default ProductBannerList;
