import MenuBar from '@components/MyPage/MenuBar';
import styled from '@lib/styled-components';
import { useLayoutEffect } from 'react';

const MyPage = function () {
  const username = 'User';

  useLayoutEffect(() => {
    // 예시 : 쿠키에 저장할지 어디에 저장할지 모르는데 일단 한 상태
    // const cookie = localStorage.getItem('cookie');
    // if (!cookie) window.location.href = '/signin';
  }, []);

  return (
    <Wrapper>
      <Content>
        <Dohyeon>{`반가워요, ${username}님!`}</Dohyeon>
        <h2>{`${username}님은 우리 문방구의 짱이십니다.`}</h2>
      </Content>
      <MenuBar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  margin: 30px auto;
  flex-direction: row-reverse;
  padding: 1%;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Content = styled.div`
  max-width: 960px;
  width: 100%;
  margin-bottom: 20%;
`;

const Dohyeon = styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 3rem;
  margin-bottom: 5%;
`;

export default MyPage;
