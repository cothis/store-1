import Link from '@lib/router/Link';
import { MouseEventHandler } from 'react';
import styled from '@lib/styled-components';
import LoginForm from '@components/Signin/LoginForm';

export default function Signin() {
  const kakaoClickHandler: MouseEventHandler = async (e) => {
    location.href = 'http://localhost:8080/api/v1/auth';
  };

  return (
    <Wrapper>
      <Title>회원 로그인</Title>
      <LoginForm />
      <OAuthButton onClick={kakaoClickHandler}>카카오 로그인</OAuthButton>
      <ButtonArea>
        <Link to="/signup-method">
          <Button>회원가입</Button>
        </Link>
      </ButtonArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 303px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 70px auto;
`;

const Title = styled.h3`
  font-size: 24px;
  color: ${({ theme }) => theme.color.lightblack};
  margin-bottom: 15px;
`;

const OAuthButton = styled.button`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.color.kakao};
  color: black;
  margin-bottom: 20px;
  border-radius: 5px;
  ${({ theme }) => theme.opacityHover};
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.color.lightblack};
  ${({ theme }) => theme.opacityHover};
`;
