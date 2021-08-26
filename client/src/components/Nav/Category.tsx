import styled from '@lib/styled-components';
import size from '@constants/size';
import { MouseEvent, useState, useEffect } from 'react';
import useHistory from '@hooks/useHistory';
import { debouncer } from '@utils/debouncer';

export interface ICategory {
  id: number;
  name: string;
  children?: ICategory[];
}

const Category = ({ categories }: { categories: ICategory[] }) => {
  const [toggleOff, setToggleOff] = useState<boolean>(false);
  const [parentActive, setParentActive] = useState<number>(-1);
  const [categoryToggle, setCategoryToggle] = useState<boolean>(false);
  const history = useHistory();
  const updateDebouncer = debouncer<void>();

  const resetActive = () => {
    setParentActive(-1);
  };

  // desktop 버전 이벤트 핸들링
  const parentHover = (e: MouseEvent<HTMLElement>) => {
    if (window.innerWidth <= size.mobile) return;

    updateDebouncer(() => {
      const target = e.target as HTMLElement;
      updateParentActive(target);
    }, 150);
  };

  const childHover = () => {
    if (window.innerWidth <= size.mobile) return;
    updateDebouncer(() => {});
  };

  // mobile ui 버전 이벤트 핸들링 && 전체보기로 이동
  const parentClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    const id = target.dataset.id;
    if (!id) return;
    if (window.innerWidth > size.mobile || +id === 0) {
      let categoryParam = +id === 0 ? '' : `/${id}`;
      history.push({ pathname: `/categories${categoryParam}` });
      categoryFadeOut();
      return;
    }
    if (parentActive === +id) {
      resetActive();
      return;
    }
    updateParentActive(target);
  };

  const childClick = (e: MouseEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    const id = target.dataset.id;
    if (!id) return;
    history.push({ pathname: `/categories/${id}` });
    categoryFadeOut();
  };

  const updateParentActive = (target: HTMLElement) => {
    const id = target.dataset.id;
    if (!id) return;
    setParentActive(+id);
  };

  // mobile ui 버전 이벤트
  const categoryFadeOut = () => {
    const toggleFinish = () => {
      setCategoryToggle(false);
      setToggleOff(false);
    };
    if (window.innerWidth > size.mobile) {
      toggleFinish();
      return;
    }
    setToggleOff(true);
    setTimeout(toggleFinish, 500);
  };

  useEffect(() => {
    resetActive();
  }, [categoryToggle]);

  return (
    <CategoryWrapper
      onMouseEnter={() => {
        if (window.innerWidth <= size.mobile) return;
        setCategoryToggle(true);
      }}
      onClick={() => {
        if (window.innerWidth > size.mobile) return;
        setCategoryToggle(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth <= size.mobile) return;
        setCategoryToggle(false);
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.33333 4H4.66667C4.29848 4 4 4.29848 4 4.66667V9.33333C4 9.70152 4.29848 10 4.66667 10H9.33333C9.70152 10 10 9.70152 10 9.33333V4.66667C10 4.29848 9.70152 4 9.33333 4Z" />
        <path d="M9.33333 14H4.66667C4.29848 14 4 14.2985 4 14.6667V19.3333C4 19.7015 4.29848 20 4.66667 20H9.33333C9.70152 20 10 19.7015 10 19.3333V14.6667C10 14.2985 9.70152 14 9.33333 14Z" />
        <path d="M19.3333 4H14.6667C14.2985 4 14 4.29848 14 4.66667V9.33333C14 9.70152 14.2985 10 14.6667 10H19.3333C19.7015 10 20 9.70152 20 9.33333V4.66667C20 4.29848 19.7015 4 19.3333 4Z" />
        <path d="M19.3333 14H14.6667C14.2985 14 14 14.2985 14 14.6667V19.3333C14 19.7015 14.2985 20 14.6667 20H19.3333C19.7015 20 20 19.7015 20 19.3333V14.6667C20 14.2985 19.7015 14 19.3333 14Z" />
      </svg>

      <p>카테고리</p>
      <CategoryMenu className={toggleOff ? 'off' : ''} style={{ display: categoryToggle ? 'block' : 'none' }}>
        <div className="header">
          <button
            onClick={(e) => {
              e.stopPropagation();
              categoryFadeOut();
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <p>카테고리</p>
        </div>
        <ul className={'parent'}>
          {categories.map((category) => {
            return (
              <li
                className={parentActive === category.id ? 'active' : ''}
                key={category.id}
                data-id={category.id}
                onMouseEnter={parentHover}
                onClick={parentClick}
              >
                <div className="parent-item">
                  <p>{category.name}</p>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <ul className={'child ' + (category.children ? '' : 'none')} onMouseEnter={childHover}>
                  <li className="all" key={parentActive} data-id={parentActive} onClick={childClick}>
                    전체보기
                  </li>
                  {category.children &&
                    category.children.map((childCategory) => (
                      <li key={childCategory.id} data-id={childCategory.id} onClick={childClick}>
                        {childCategory.name}
                      </li>
                    ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </CategoryMenu>
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  > svg {
    width: 2rem;
    height: 2rem;
    margin-right: 0.3em;
    path {
      stroke: black;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }
  > p {
    height: 100%;
    text-align: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    position: static;
    > p {
      display: none;
    }
  }
`;
const CategoryMenu = styled.div`
  @keyframes cate-fade-in {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes cate-fade-out {
    to {
      transform: translateX(-100%);
    }
    from {
      transform: translateX(0);
    }
  }
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 1rem;
  > .header {
    display: none;
  }
  ul {
    width: 200px;
    border-radius: 6px;
    color: white;
    > li {
      padding: 1em;
    }
  }
  > .parent {
    background-color: ${({ theme }) => theme.color.baeminPrimary};
    > li {
      .parent-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
        i {
          display: none;
        }
      }
      > .child {
        display: none;
        position: absolute;
        height: 100%;
        left: 100%;
        top: 0;
      }
    }
    > li.active {
      background-color: ${({ theme }) => theme.color.baeminDark};
      > .child:not(.none) {
        display: block;
        background-color: ${({ theme }) => theme.color.baeminDark};
        > .all {
          display: none;
        }
        > li:hover {
          cursor: pointer;
          text-decoration: underline;
          text-underline-position: under;
        }
      }
    }
  }
  // mobile ui
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    z-index: 10;
    animation: cate-fade-in 0.5s forwards;
    &.off {
      animation: cate-fade-out 0.5s forwards;
    }
    > .header {
      display: flex;
      justify-content: center;
      position: relative;
      padding: 1rem;
      background-color: #eee;
      > button {
        position: absolute;
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
      }
    }
    > ul {
      border-radius: 0;
      width: 100%;
      color: black;
    }
    .parent {
      min-height: calc(100vh - 48px);
      background-color: white;
      > li {
        border-bottom: 1px solid #ddd;
        padding: 0;
        > .parent-item {
          padding: 1em;
        }
        &:not([data-id='0']) i {
          display: block !important;
          font-size: 0.8rem;
          transition: 0.3s;
        }
        &:nth-child(1) {
          border-top: 1px solid #ddd;
        }
        &.active {
          background-color: #f1f1ef;
          i {
            transform: rotate(-180deg);
          }
          > .child {
            display: block;
            position: static;
            width: 100%;
            color: inherit;

            > li {
              background-color: #f1f1ef;
            }
            > .all {
              display: block !important;
            }
          }
        }
      }
    }
  }
`;

export default Category;
