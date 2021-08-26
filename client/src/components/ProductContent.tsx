import styled from '@lib/styled-components';
import { IProductListItem } from '@types';
import ProductList from './ProductList';

interface ProductContentProps {
  content: string[];
  detailInfo: [string, string][];
  recommends: IProductListItem[];
}

const ProductContent = function ({ content, detailInfo, recommends }: ProductContentProps) {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  border-top: 1px solid lightgray;
  margin-top: 5%;
  max-width: 1200px;
  width: 100%;
`;

const ImageContents = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 100%;
  > img {
    width: 100%;
    margin-bottom: 5%;
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

export default ProductContent;
