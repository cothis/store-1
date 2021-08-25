import { useState } from 'react';
import styled from '@lib/styled-components';
import { useProductDetail } from '@hooks/query/products/detail';
import useParams from '@hooks/useParams';

import Loading from '@components/Loading';
import Count from '@components/common/Count';
import ButtonNext from '@components/common/ButtonNext';
import ButtonPrev from '@components/common/ButtonPrev';
import HeartButton from '@components/common/HeartButton';
import ProductContent from '@components/ProductContent';

import productThumbOne from '@assets/images/product_one.png';
import ContentOne from '@assets/images/content_one.jpeg';
import ContentTwo from '@assets/images/content_two.jpeg';

const Product = function () {
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const { isLoading, isError, data, error } = useProductDetail(id);
  if (isLoading) return <Loading />;
  if (isError) throw error;
  if (!data) return <></>;
  const { title, price, originalPrice, priceText, like, imageUrl, content, spec, recommendations } = data;
  return (
    <ProductWrapper>
      <InfomationArea>
        {/* <ProductImage src={imageUrl} alt="상품 이미지" /> */}
        <ProductImage src={productThumbOne} alt="상품 이미지" />
        <Infomation>
          <Title>{title}</Title>
          {originalPrice && (
            <SubInfomation>
              <Span>정가</Span>
              <OriginalPrice>{`${originalPrice.toLocaleString()}원`}</OriginalPrice>
            </SubInfomation>
          )}
          <SubInfomation>
            <Span>판매가격</Span>
            {price ? <Price>{`${price.toLocaleString()}원`}</Price> : <PriceText>{priceText}</PriceText>}
          </SubInfomation>
          <SubInfomation>
            <Span>배송정보</Span>
            <P>
              2,500원 (3만원 이상 구매시 무료)
              <br /> 오후 2시 당일배송마감
            </P>
          </SubInfomation>

          {price ? (
            <>
              <SelectAmount>
                <ProductTitle>{title}</ProductTitle>
                <Count count={count} setCount={setCount} />
                <TotalPriceMini>{`${(price * count).toLocaleString()}원`}</TotalPriceMini>
              </SelectAmount>
              <BottomInfomation>
                <TotalPriceArea>
                  <TotalPriceAreaSpan>총 합계금액</TotalPriceAreaSpan>
                  <TotalPrice>{`${(price * count).toLocaleString()}원`}</TotalPrice>
                </TotalPriceArea>
                <ButtonArea>
                  <MiniButtonArea>
                    <HeartButton initialState={like} />
                    <ButtonPrev clickHandler={() => {}} text="장바구니"></ButtonPrev>
                  </MiniButtonArea>
                  <ButtonNext clickHandler={() => {}} $isPossible={price !== 0} text="바로 구매"></ButtonNext>
                </ButtonArea>
              </BottomInfomation>
            </>
          ) : (
            <SoldOutButton>SOLD OUT</SoldOutButton>
          )}
        </Infomation>
      </InfomationArea>
      <ProductContent content={[ContentOne, ContentTwo]} spec={spec} recommendations={recommendations} />
      {/* <ProductContent content={content} spec={spec} recommendations={recommendations} /> */}
    </ProductWrapper>
  );
};

const ProductWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const InfomationArea = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  padding: 0 40px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.media.medium}) {
    flex-direction: column;
  }
`;

const ProductImage = styled.img`
  max-width: 473px;
  width: 45%;
  max-height: 100%;
  @media (max-width: ${({ theme }) => theme.media.medium}) {
    width: 90%;
    margin-bottom: 5%;
  }
`;
const Infomation = styled.div`
  max-width: 556px;
  width: 50%;
  height: 585px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.media.medium}) {
    width: 90%;
  }
`;

const Title = styled.h1`
  padding-bottom: 20px;
  margin-bottom: 30px;
  font-size: 2.2rem;
  color: #333;
  word-break: break-all;
  font-weight: 600;
`;

const Price = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
`;

const OriginalPrice = styled.h3`
  font-size: 1rem;
  color: #333333;
  text-decoration: line-through;
`;

const PriceText = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baeminPrimary};
`;

const SelectAmount = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  margin-top: 40px;
  padding: 20px;
`;

const ProductTitle = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: auto;
`;

const TotalPriceMini = styled.span`
  width: 70px;
  text-align: right;
  font-size: 0.8rem;
  margin-left: 25px;
`;

const TotalPriceArea = styled.div`
  padding-top: 25px;
  display: flex;
  align-items: center;
`;

const TotalPriceAreaSpan = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #717171;
  margin-right: auto;
`;

const TotalPrice = styled.h2`
  margin-left: auto;
  font-size: 2.2rem;
  font-family: 'Do Hyeon', sans-serif;
  color: ${({ theme }) => theme.color.baeminPrimary};
`;

const ButtonArea = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const MiniButtonArea = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 6px;
`;

const Span = styled.span`
  width: 100px;
  font-size: 1rem;
  color: #717171;
`;

const SubInfomation = styled.div`
  display: flex;
  padding: 4px 0;
  margin-bottom: 5px;
  line-height: 1.8;
`;

const P = styled.p`
  font-size: 1rem;
  line-height: 1.8;
`;

const BottomInfomation = styled.div`
  width: 100%;
  height: 140px;
  margin-top: auto;
  border-top: 1px solid #dbdbdb;
`;

const SoldOutButton = styled.button`
  width: 100%;
  height: 67px;
  margin-top: auto;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 2rem;
  padding: 0 10px;
  color: white;
  background-color: #b5b5b5;
  border-radius: 6px;
  cursor: default;
`;

export default Product;
