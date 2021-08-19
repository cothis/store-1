import styled from '@lib/styled-components';
import Agreement from '@components/Signup/Agreement';
import { MouseEventHandler } from 'react';
import FormElement from '@components/Signup/FormElement';
import Address from '@components/Signup/Address';
import useHistory from '@hooks/useHistory';

const Signup = () => {
  const history = useHistory();
  const submitHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    // POST 처리

    // 회원가입 축하 화면 or 로그인 화면
    history.push({ pathname: '/signin' });
  };
  return (
    <Wrapper>
      <Title>회원 가입</Title>
      <P>기본정보</P>
      <Form>
        <FormElement elementName={'아이디'} inputName={'loginid'} type={'text'} isLong />
        <FormElement elementName={'비밀번호'} inputName={'password'} type={'password'} />
        <FormElement elementName={'비밀번호 확인'} type={'password'} />
        <FormElement elementName={'이름'} inputName={'realname'} type={'text'} isLong />
        <FormElement elementName={'이메일'} inputName={'email'} type={'email'} />
        <Address />
        <Agreement clickHandler={submitHandler} />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 743px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 70px auto;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.lightblack};
  margin-bottom: 15px;
`;

const P = styled.p`
  width: 90%;
  text-align: left;
`;

const Form = styled.form`
  width: 100%;
  border-top: 2px solid black;
  margin-top: 2%;
`;

export default Signup;
