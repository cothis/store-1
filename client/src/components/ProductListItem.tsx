import styled from '@lib/styled-components';
import Link from '@lib/router/Link';
import { IProductListItem } from '@types';

interface IThumbnail {
  imageUrl: string;
  title: string;
  tags?: string[];
}
function Thumbnail({ imageUrl, title, tags }: IThumbnail) {
  return (
    <div className="img-container">
      <img className="thumbnail" src={imageUrl} alt={title} />
      {tags &&
        (tags.includes('soldout') ? (
          <div className="sold-out">다 팔렸어요</div>
        ) : (
          <div className="tag-wrapper">
            {tags.map((tag) => {
              if (tag === 'disabled') return;
              return (
                <p className={tag} key={tag}>
                  {tag.toUpperCase()}
                </p>
              );
            })}
          </div>
        ))}
    </div>
  );
}

function ProductItem({ product }: { product: IProductListItem }) {
  const { id, imageUrl, title, tags, price, originalPrice, priceText } = product;
  return (
    <Product>
      <Link to={`/products/${id}`}>
        <Thumbnail imageUrl={imageUrl} title={title} tags={tags} />
        <div className="product-info">
          {originalPrice && price && <p className="sale-percent">{Math.round((price / originalPrice) * 100)}%</p>}
          <p className="product-title">{title}</p>
          <div className="price-wrapper">
            {originalPrice && <p className="original-price">{originalPrice.toLocaleString()}</p>}
            {price && <p className="price">{price.toLocaleString()}원</p>}
            {priceText && <p className="price">{priceText}</p>}
          </div>
        </div>
      </Link>
    </Product>
  );
}

const Product = styled.li`
  &:hover {
    .thumbnail {
      transform: scale(1.1);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    .thumbnail {
      width: 100%;
      object-fit: cover;
      transition: 0.3s;
    }
    .sold-out {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Do Hyeon', sans-serif;
      font-size: 2rem;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
    }
    .tag-wrapper {
      position: absolute;
      top: 6px;
      left: 6px;
      display: flex;
      gap: 6px;

      > p {
        font-size: 0.8rem;
        padding: 0.3em;
        border-radius: 5px;
        font-weight: 900;
        text-align: center;
        color: white;
        &.green {
          background-color: ${({ theme }) => theme.color.green};
        }
        &.best {
          background-color: ${({ theme }) => theme.color.lightblack};
        }
        &.sale {
          background-color: ${({ theme }) => theme.color.red};
        }
        &.new {
          background-color: ${({ theme }) => theme.color.blue};
        }
      }
    }
  }
  .product-info {
    padding: 0.6em 0;
    > p {
      margin-bottom: 0.5em;
    }
    > .sale-percent {
      font-family: 'Do Hyeon', sans-serif;
      color: ${({ theme }) => theme.color.redSecondary};
      font-size: 1.3rem;
      font-weight: bold;
    }
    .original-price {
      font-size: 0.7rem;
      color: #888;
      text-decoration: line-through;
    }
    .price {
      font-size: 1.1rem;
      font-family: 'Do Hyeon', sans-serif;
      font-weight: bold;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobileSmall}) {
    > a {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 10px;

      .product-info {
        padding: 0;
      }
      .sold-out {
        font-size: 1.2rem !important;
      }
      .tag-wrapper > p {
        font-size: 0.6rem !important;
      }
    }
  }
`;

export default ProductItem;
