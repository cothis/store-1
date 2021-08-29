import ButtonNext from '@components/common/ButtonNext';
import ButtonPrev from '@components/common/ButtonPrev';
import useHistory from '@hooks/useHistory';
import styled from '@lib/styled-components';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';

const MyPageConfirm = function () {
  const [inputValue, setInputValue] = useState('');
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  const history = useHistory();
  const cancelClickHandler: MouseEventHandler = () => {
    history.back();
  };
  const submitClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    // POST 처리

    // 성공시 처리 -> 아마 보안 인증하는 무언가가 더 있어야만 접근 가능한 식으로 처리해야할 것으로 보임
    history.push({ pathname: '/my-page/edit' });

    // 실패시 처리
    // toasify ui 등으로 처리 후 새로고침
  };
  return (
    <Container>
      <Title>회원정보 변경</Title>
      <Description>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해 주세요.</Description>
      <Form>
        <InputArea>
          <Span>비밀번호</Span>
          <Input type="password" name="password" value={inputValue} onChange={changeHandler} />
        </InputArea>
        <ButtonArea>
          <ButtonPrev clickHandler={cancelClickHandler} />
          <ButtonNext clickHandler={submitClickHandler} $isPossible={inputValue.length > 0} text="인증하기" />
        </ButtonArea>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 1.2rem;
  }
`;

const Description = styled.h2`
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  margin-bottom: 1.2rem;
  border-top: 1px solid lightgray;

  text-align: center;
  font-size: 0.9rem;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-top: 0.8rem;
    padding-top: 0.8rem;
    margin-bottom: 1.6rem;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputArea = styled.div`
  width: 70%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dadada;
  background-color: #f7f9f8;
`;

const Span = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  height: 31px;
  padding: 0 10px;
  border: 1px solid #d6d6d6;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 50%;
  }
`;

const ButtonArea = styled.div`
  margin-top: 5%;
  width: 40%;
  display: flex;
  justify-content: space-around;
`;

export default MyPageConfirm;
