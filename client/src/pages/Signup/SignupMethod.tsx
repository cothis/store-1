import { API_ENDPOINT } from '@config';
import Link from '@lib/router/Link';
import styled from '@lib/styled-components';

const SignupMethod = () => {
  const oauthClickHandler = () => {
    location.href = API_ENDPOINT + '/api/v1/auth/kakao';
  };
  return (
    <Wrapper>
      <Link to="/signup">
        <SignupButton>배민문방구로 회원가입</SignupButton>
      </Link>
      <OAuthSignupButton onClick={oauthClickHandler}>카카오 회원가입</OAuthSignupButton>
      <MemberGuide>
        <Span>이미 배민문방구 회원이신가요?</Span>
        <Link to="/signin">
          <Login>로그인</Login>
        </Link>
      </MemberGuide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 70px auto;
  > * {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const SignupButton = styled.button`
  width: 100%;
  height: 89px;
  background-color: ${({ theme }) => theme.color.lightblack};
  color: white;
  font-size: 24px;
  border-radius: 5px;
  ${({ theme }) => theme.opacityHover};
`;

const OAuthSignupButton = styled.button`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.color.kakao};
  color: black;
  font-size: 16px;
  border-radius: 5px;
  ${({ theme }) => theme.opacityHover};
`;

const MemberGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  font-size: 12px;
  color: #666666;
  margin-right: 5px;
  text-align: center;
`;

const Login = styled.span`
  font-size: 12px;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

export default SignupMethod;
