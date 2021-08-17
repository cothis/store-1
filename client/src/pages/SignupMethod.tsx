import Link from '@/router/Link';
import styled from '@lib/styled-components';

const SignupMethod = () => {
  return (
    <Wrapper>
      <Link to="/signup">
        <SignupButton>배민문방구로 회원가입</SignupButton>
      </Link>
      <Link to="/oauth">
        <OAuthSignupButton>카카오 회원가입</OAuthSignupButton>
      </Link>
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
  width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 70px auto;
  > * {
    margin-bottom: 20px;
  }
`;

const SignupButton = styled.button`
  width: 460px;
  height: 89px;
  background-color: ${({ theme }) => theme.color.lightblack};
  color: white;
  font-size: 24px;
  border-radius: 5px;
  ${({ theme }) => theme.opacityHover};
`;

const OAuthSignupButton = styled.button`
  width: 460px;
  height: 55px;
  background-color: ${({ theme }) => theme.color.kakao};
  color: black;
  font-size: 16px;
  border-radius: 5px;
  ${({ theme }) => theme.opacityHover};
`;

const MemberGuide = styled.div``;

const Span = styled.span`
  font-size: 12px;
  color: #666666;
  margin-right: 5px;
`;

const Login = styled.span`
  font-size: 12px;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

export default SignupMethod;
