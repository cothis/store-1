import ButtonNext from '@components/common/ButtonNext';
import ButtonPrev from '@components/common/ButtonPrev';
import MenuBar from '@components/MyPage/MenuBar';
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
    <Wrapper>
      <Content>
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

const Description = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 5%;
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
