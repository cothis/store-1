import styled from '@lib/styled-components';
import { IProductListItem } from '@types';
import ProductList from './ProductList';
import { RefObject, useMemo, useRef, MouseEventHandler } from 'react';
import { useUser } from '@hooks/query/users';

import Board from '@components/Board';

interface ProductContentProps {
  content: string[];
  detailInfo: [string, string][];
  recommends: IProductListItem[];
  id: string;
}

interface TabProps {
  refArr: RefObject<HTMLDivElement>[];
  idx: number;
}

export default function ProductContent({ content, detailInfo, recommends, id }: ProductContentProps) {
  const detailRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);
  const changeRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const qnaRef = useRef<HTMLDivElement>(null);
  const refArr = useMemo(() => {
    return [detailRef, deliveryRef, changeRef, reviewRef, qnaRef];
  }, []);

  const { isError: login } = useUser();

  return (
    <Wrapper>
      <Tabs refArr={refArr} idx={0} />
      {content && (
        <ImageContents>
          {content.map((con, idx) => {
            return <img src={con} alt={`image content-${idx}`} key={`image content-${idx}`} />;
          })}
        </ImageContents>
      )}
      {detailInfo && (
        <>
          <SubTitle>상품필수 정보</SubTitle>
          <DetailInfoContents>
            <tbody>
              {detailInfo.map((info, idx) => {
                const [description, content] = info;
                return (
                  <tr key={`tr-${idx}`}>
                    <th>{description}</th>
                    <td>{content}</td>
                  </tr>
                );
              })}
            </tbody>
          </DetailInfoContents>
        </>
      )}
      {recommends && recommends.length > 0 && (
        <RecommendContents>
          <SubTitle>이건 어때요?</SubTitle>
          <ProductList products={recommends} />
        </RecommendContents>
      )}
      <Tabs refArr={refArr} idx={1} />
      <div className="product__content--info">
        <h4>배송안내</h4>
        <ul>
          <li>배송사 : CJ대한통운</li>
          <li>배송비 : 2,500원 (3만원 이상 구매 시 무료배송) 도서, 산간 일부지역은 배송비가 추가될 수 있습니다.</li>
          <li>배송기간: 오후 2시 이전 결제완료시 당일 출고 (영업일 기준)</li>
        </ul>
        <br />
        <p>단, 상품의 재고 상황, 배송량, 배송 지역에 따라 배송일이 추가로 소요될 수 있는 점 양해 부탁드립니다.</p>
      </div>
      <Tabs refArr={refArr} idx={2} />
      <div className="product__content--info">
        <h4>교환 및 반품안내</h4>
        <ul>
          <li>주문 취소 및 배송지 변경은 “결제완료” 단계에서만 가능합니다.</li>
          <ul>
            <li>마이페이지에서 취소 또는 변경하실 수 있습니다.</li>
          </ul>
          <li>"상품준비중" 단계에서는 주문 취소 및 배송지 변경이 불가합니다.</li>
          <li>교환 및 반품은 배송완료 후 7일 이내에 가능합니다.</li>
          <ul>
            <li>
              단, 재화 등의 내용이 표시, 광고 내용과 다르거나 계약내용을 다르게 이행한 경우에는 재화 등을 공급받은
              날로부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 교환 및 반품이 가능합니다.
            </li>
          </ul>
          <br />
          <li>다음의 경우 교환 및 반품이 불가합니다.</li>
          <ul>
            <li>구매자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우</li>
            <li>구매자의 사용 또는 일부 소비에 의해 재화 등의 가치가 현저히 감소한 경우</li>
            <li>복제가 가능한 재화 등의 포장을 훼손한 경우(CD/DVD/GAME/도서의 경우 포장 개봉 시)</li>
            <li>시간 경과에 의하여 재판매가 곤란할 정도로 상품의 가치가 현저히 감소한 경우</li>
            <li>고객의 주문에 따라 개별 생산되는 상품의 경우</li>
          </ul>
          <br />
          <li>상품의 불량/하자 및 표시광고 및 계약 내용이 다른 경우 해당 상품의 회수 비용은 무료입니다.</li>
          <li>
            고객님의 단순변심에 의한 교환/반품일 경우에는 교환/반품 배송비(왕복 배송비) 5,000원을 고객님께서 부담하셔야
            합니다.
          </li>
          <br />
          <li>반송지 : 우)10846 경기 파주시 탄현면 축현리 241-4 배민문방구 물류센터</li>
        </ul>
        <h4>환불안내</h4>
        <ul>
          <li>주문취소 및 반품 시 환불은 주문 시 이용하신 결제수단으로 2~7 영업일 이내 환불됩니다.</li>
        </ul>
        <h4>AS안내</h4>
        <ul>
          <li>제품에 문제가 있으신 경우, 배민문방구 고객센터로 접수해주시면 안내 도와드리겠습니다.</li>
          <li>
            배민문방구에서 발생한 문제는 소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.
          </li>
        </ul>
      </div>
      <Tabs refArr={refArr} idx={3} />
      <Board header="상품후기" id={id} type="reviews" login={!login} />
      <Tabs refArr={refArr} idx={4} />
      <Board header="상품문의" id={id} type="questions" login={!login} />
    </Wrapper>
  );
}

const tabText = ['상품상세정보', '배송안내', '교환 및 반품안내', '상품후기', '상품문의'];
function Tabs({ refArr, idx }: TabProps) {
  const tabClickHandler: MouseEventHandler = ({ target }) => {
    const targetAsEl = target as HTMLDivElement;
    const item = targetAsEl.closest<HTMLElement>('.tabs__content');
    const idx = item?.dataset.idx;
    if (!idx) return;
    const { current } = refArr[+idx];
    if (!current) return;
    const { top } = current.getBoundingClientRect();
    window.scrollTo(0, top + window.scrollY - 100);
  };

  return (
    <TabsWrapper ref={refArr[idx]} onClick={tabClickHandler}>
      {tabText.map((text, tidx) => (
        <div key={`tab-${tidx}`} data-idx={tidx} className={'tabs__content' + (idx === tidx ? ' current' : '')}>
          {text}
        </div>
      ))}
    </TabsWrapper>
  );
}

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-bottom: 1px solid #aaa;
  gap: 0.5rem;
  .tabs__content {
    font-size: 0.8rem;
    padding: 1em;
    color: #888;
    border: 1px solid #aaa;
    border-bottom: none;
    &.current {
      font-size: 1rem;
      color: black;
    }
    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    justify-content: space-between;
    padding-bottom: 0.5rem;
    gap: 0;
    .tabs__content {
      font-size: 0.7rem !important;
      border: none;
      padding: 0;
      &.current {
        font-weight: bold;
      }
    }
  }
`;

const Wrapper = styled.div`
  /* ${({ theme }) => theme.flexCenter} */
  /* flex-direction: column; */
  border-top: 1px solid lightgray;
  margin: 5% auto;
  max-width: ${({ theme }) => theme.media.desktop};
  padding: 1rem;
  width: 100%;
  > * {
    margin: 2rem auto;
  }
  h4 {
    font-weight: bold;
    font-size: 1.2rem;
    margin: 1em 0;
  }
  .product__content--info {
    width: 100%;
    font-size: 0.8rem;
    line-height: 2em;
    ul {
      list-style: disc inside;
      > ul {
        padding-left: 1em;
        list-style: square inside;
      }
    }
  }
`;

const ImageContents = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 100%;
  > img {
    width: 100%;
  }
`;

const DetailInfoContents = styled.table`
  width: 80%;
  margin-bottom: 5%;
  @media (max-width: ${({ theme }) => theme.media.medium}) {
    width: 90%;
  }
  > tbody {
    display: table-row-group;
    vertical-align: middle;
    width: 100%;
    > tr {
      width: 100%;
      display: table-row;
      > th {
        width: 20%;
        padding: 10px 10px 10px 14px;
        color: #555555;
        border: 1px solid #dbdbdb;
        background: #f9f9f9;
        text-align: left;
      }
      > td {
        width: 80%;
        padding: 10px 10px 10px 18px;
        border: 1px solid #dbdbdb;
        text-align: left;
      }
    }
  }
`;

const SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  width: 80%;
  margin-bottom: 2%;
`;

const RecommendContents = styled.div`
  width: 80%;
  @media (max-width: ${({ theme }) => theme.media.medium}) {
    width: 90%;
  }
`;
