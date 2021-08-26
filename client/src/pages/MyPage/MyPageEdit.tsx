import styled from '@lib/styled-components';
import FormElement from '@components/common/FormElement';
import FormElementWithoutInput from '@components/MyPage/FormElementWithoutInput';
import Address from '@components/common/Address';
import MenuBar from '@components/MyPage/MenuBar';
import ButtonNext from '@components/common/ButtonNext';
import ButtonPrev from '@components/common/ButtonPrev';
import useHistory from '@hooks/useHistory';
import { MouseEventHandler, useEffect } from 'react';

const MyPageEdit = () => {
  const history = useHistory();
  const cancelClickHandler: MouseEventHandler = () => {
    history.back();
  };
  const submitClickHandler: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    // POST 처리
    history.push({ pathname: '/my-page' });
  };
  useEffect(() => {
    // GET 처리로 initial value들 전부 가져오기
  }, []);
  return (
    <Wrapper>
      <Form>
        <Title>회원정보 변경</Title>
        <P>기본정보</P>
        <FormElementWithoutInput elementName="아이디" initialInputValue="아이디 받아와서 넣기" />
        <FormElement elementName="새로운 비밀번호" inputName="password" type="password" />
        <FormElement elementName="새로운 비밀번호 확인" type="password" />
        <FormElement
          elementName="이름"
          inputName="realname"
          type="text"
          isLong
          initialInputValue="이름 받아와서 넣기"
        />
        <FormElement elementName="이메일" inputName="email" type="email" initialInputValue="이메일 받아와서 넣기" />
        <Address initialZipcode="12345" initialAddress="우아한형제들" initialAddressDetail="작은 집" />
        <ButtonArea>
          <ButtonPrev clickHandler={cancelClickHandler} />
          <ButtonNext clickHandler={submitClickHandler} $isPossible={true} text="정보 수정" />
        </ButtonArea>
      </Form>
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

const Title = styled.h1`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin-bottom: 5%;
  font-size: 1.5rem;
  font-weight: bold;
`;

const P = styled.p`
  width: 100%;
  text-align: left;
  padding: 2%;
  border-bottom: 1px solid gray;
`;

const Form = styled.form`
  max-width: 960px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonArea = styled.div`
  margin-top: 5%;
  width: 40%;
  display: flex;
  justify-content: space-around;
`;

export default MyPageEdit;
