import styled from '@lib/styled-components';
import useLocalStorage from '@hooks/useLocalStorage';
import { IRecentProduct } from '@types';
import NavLink from '@lib/router/NavLink';
import { useState, useReducer, useCallback, useEffect } from 'react';

type Action = { type: 'INCREASE'; max: number } | { type: 'DECREASE' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      if (action.max === state) return state;
      return state + 1;
    case 'DECREASE':
      if (state === 0) return state;
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
}

export default function RecentProduct() {
  const [recentProducts, _] = useLocalStorage<IRecentProduct[]>('recent', []);
  const [level, dispatch] = useReducer(reducer, 0);
  const [mobileOn, setMobileOn] = useState<boolean>(false);

  const onIncrease = () => {
    dispatch({ type: 'INCREASE', max: recentProducts.length - 3 });
  };

  const onDecrease = () => {
    dispatch({ type: 'DECREASE' });
  };

  return (
    <>
      {mobileOn && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
          }}
          onClick={() => {
            setMobileOn(false);
          }}
        ></div>
      )}
      <RecentWrapper className={mobileOn ? 'recent-wrapper on' : 'recent-wrapper'}>
        <h5
          onClick={() => {
            if (innerWidth > 1300) return;
            setMobileOn(true);
          }}
        >
          최근 게시물
        </h5>
        <button onClick={onDecrease}>
          <i className="fas fa-chevron-up"></i>
        </button>
        <div className="snb__recent">
          {recentProducts.length > 0 ? (
            <ul className="snb__recent--list" style={{ transform: `translateY(-${level * 33.34}%)` }}>
              {recentProducts.map((product) => {
                return (
                  <li key={`recent-${product.id}`} className="snb__recent--item">
                    <NavLink goTop to={`/products/${product.id}`}>
                      <img src={product.imageUrl} alt="최근 게시물 이미지" />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="snb__recent--empty">텅</p>
          )}
        </div>
        <button onClick={onIncrease}>
          <i className="fas fa-chevron-down"></i>
        </button>
      </RecentWrapper>
    </>
  );
}

const RecentWrapper = styled.div`
  padding: 0.5rem;
  background-color: white;
  margin-bottom: 3rem;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 10px;
  border-radius: 6px;
  h5 {
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .snb__recent {
    margin: 0.5rem 0;
    height: 300px;
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.3rem;
  }
  .snb__recent--list {
    transition: 0.3s;
    height: 100%;
    .snb__recent--item {
      height: 33.33%;
      padding: 0.3rem;

      > a {
        height: 100%;
      }
      img {
        height: 100%;
      }
    }
  }
  > button {
    width: 100%;
    font-size: 0.8rem;
  }
  .snb__recent--empty {
    font-size: 1.1rem;
    width: 100%;
    height: 100%;
    ${({ theme }) => theme.flexCenter};
    font-family: 'Do Hyeon', sans-serif;
  }

  @media (max-width: 1300px) {
    &.on {
      transform: translateX(-100%);
    }
    position: fixed;
    bottom: 0;
    right: -200px;
    height: calc(100vh - 96px);
    width: 200px;
    transition: 0.5s;
    margin: 0;
    ${({ theme }) => theme.flexCenter};
    flex-direction: column;
    h5 {
      font-family: 'Do Hyeon', sans-serif;
      font-size: 1rem;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate3d(-100%, -50%, 0);
      background-color: ${({ theme }) => theme.color.baeminPrimary};
      color: white;
      padding: 0.5em;
      margin: 0;
      writing-mode: vertical-rl;
      text-orientation: upright;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      &:hover {
        cursor: pointer;
      }
    }
    .snb__recent {
      height: 70%;
    }
    > button {
      padding: 0.5em 0;
      font-size: 1.1rem;
    }
  }
`;
