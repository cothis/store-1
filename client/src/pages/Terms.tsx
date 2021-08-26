import { useTerms } from '@hooks/query/users';
import usePath from '@hooks/usePath';
import styled from '@lib/styled-components';
import { Term } from '@types';
import Loading from '@components/Loading';

export default function Terms() {
  const path = usePath();

  let title = '에러';

  switch (path.pathname) {
    case '/agreement':
      title = '이용약관';
      break;
    case '/privacy':
      title = '개인정보 수집 및 이용';
      break;
  }

  const { isLoading, isError, error, data } = useTerms(path.pathname as Term);

  if (isError) {
    throw error;
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>
        {isLoading && <Loading />}
        {data &&
          data.split('\n').map((line) => {
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.media.desktop};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  margin: 70px auto;
`;

const Title = styled.h1`
  width: 100%;
  border-bottom: 1px solid gray;
  font-weight: bold;
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const Content = styled.div`
  width: 100%;
  font-size: 12px;
  color: #333;
  line-height: 1.5;
`;
