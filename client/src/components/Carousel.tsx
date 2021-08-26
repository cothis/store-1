import styled from '@lib/styled-components';
import useHistory from '@hooks/useHistory';
import { UIEvent, useState, useEffect, useRef, MouseEventHandler, useCallback } from 'react';
import { IBanner } from '@types';
interface CarouselProps {
  items: IBanner[];
  carouselWidth: string;
}

const Carousel = ({ items, carouselWidth }: CarouselProps) => {
  const [page, setPage] = useState<number>(0);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const moveNextPage = useCallback(() => {
    const nextPage = (page + 1) % items.length;
    const { current: wrapper } = scrollWrapper;
    wrapper?.scrollTo(nextPage * innerWidth, 0);
  }, [page]);

  useEffect(() => {
    const timeoutNum = setTimeout(moveNextPage, 4000);
    return () => {
      clearTimeout(timeoutNum);
    };
  }, [page]);

  const scrollHandler = ({ currentTarget }: UIEvent) => {
    const { scrollLeft } = currentTarget;
    const nextPage = Math.round(scrollLeft / innerWidth);
    setPage(nextPage);
  };
  const pageClickHandler: MouseEventHandler = ({ currentTarget }) => {
    if (!(currentTarget instanceof HTMLElement) || !currentTarget.dataset.idx) return;
    const { current: wrapper } = scrollWrapper;
    const nextPage = +currentTarget.dataset.idx;
    wrapper?.scrollTo(nextPage * innerWidth, 0);
  };

  return (
    <BannerContainer>
      <div
        className="scroll-wrapper"
        style={{
          width: carouselWidth,
        }}
        onScroll={scrollHandler}
        ref={scrollWrapper}
      >
        {items.map((item) => (
          <img
            src={item.imageUrl}
            key={item.productId}
            onClick={() => {
              history.push({ pathname: `/products/${item.productId}` });
            }}
          />
        ))}
      </div>
      <div className="circle-container">
        {Array.from({ length: items.length }, (_, idx) => (
          <div
            className={'circle ' + (page === idx ? 'current' : '')}
            key={idx}
            data-idx={idx}
            onClick={pageClickHandler}
          ></div>
        ))}
      </div>
      <ul className="title-list">
        {items.map(({ title }, idx) => (
          <li className={page === idx ? 'current' : ''} key={title} data-idx={idx} onClick={pageClickHandler}>
            {title}
          </li>
        ))}
      </ul>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  position: relative;
  .scroll-wrapper {
    display: flex;
    height: 350px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    > img {
      width: 100%;
      height: 100%;
      flex: none;
      object-fit: cover;
      scroll-snap-align: center;
      scroll-snap-stop: always;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .circle-container {
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    .circle {
      width: 1rem;
      height: 1rem;
      margin: 0 0.5rem;
      background-color: ${({ theme }) => theme.color.baeminPrimary};
      border-radius: 0.5rem;
      transition: 0.3s;
      opacity: 0.7;
      &.current {
        width: 2.5rem;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .title-list {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    font-family: 'Do Hyeon', sans-serif;
    font-size: 1.2rem;
    color: white;
    border-radius: 5px;
    overflow: hidden;
    > li {
      padding: 1em;
      transition: 0.3s;
      opacity: 0.4;
      background-color: ${({ theme }) => theme.color.baeminDark};
      &.current {
        opacity: 1;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .scroll-wrapper {
      height: 270px;
    }
    .title-list {
      display: none;
    }
  }
`;

export default Carousel;
