import styled from '@lib/styled-components';

interface ProductContentProps {
  content: string[];
  spec: [string, string][];
  recommendations: string[];
}

const ProductContent = function ({ content, spec, recommendations }: ProductContentProps) {
  return (
    <Wrapper>
      {content && (
        <ImageContents>
          {content.map((con, idx) => {
            return <img src={con} alt={`image content-${idx}`} key={`image content-${idx}`} />;
          })}
        </ImageContents>
      )}
      {spec && (
        <SpecContents>
          <tbody>
            {spec.map((sp, idx) => {
              const [description, content] = sp;
              return (
                <tr key={`tr-${idx}`}>
                  <th>{description}</th>
                  <td>{content}</td>
                </tr>
              );
            })}
          </tbody>
        </SpecContents>
      )}
      {recommendations &&
        recommendations.map((rec, idx) => {
          return <div key={`recommend-${idx}`}></div>;
        })}
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

const SpecContents = styled.table`
  width: 50%;
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

export default ProductContent;
