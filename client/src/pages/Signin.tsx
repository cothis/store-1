import Link from '@/router/Link';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const Singin = () => {
  const loginClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
      <Title>회원 로그인</Title>
      <Form>
        <Input placeholder="아이디" type="text" />
        <Input placeholder="비밀번호" type="password" />
        <CheckboxArea>
          <Checkbox type="checkbox" />
          <Span>아이디 저장</Span>
        </CheckboxArea>
        <LoginButton onClick={loginClickHandler}>로그인</LoginButton>
      </Form>
      <OAuthButton>카카오 로그인</OAuthButton>
      <ButtonArea>
        <Link to="/signup-method">
          <Button>회원가입</Button>
        </Link>
      </ButtonArea>
    </Wrapper>
  );
};

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

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 12px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.inputBorder};
  &:focus {
    border-bottom-color: ${({ theme }) => theme.color.baeminPrimary};
  }
`;

const CheckboxArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const Span = styled.span`
  font-family: NotoSans, nanumgothic, '나눔고딕', Malgun Gothic, '맑은 고딕', AppleGothic, Dotum, '돋움', sans-serif;
`;

const LoginButton = styled.button`
  height: 55px;
  background-color: ${({ theme }) => theme.color.lightblack};
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  border-radius: 5px;
  ${({ theme }) => theme.opacityHover};
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

export default Singin;
