import { ERROR_MESSAGE_PASSWORD, ERROR_MESSAGE_PASSWORD_DUPLICATE } from '@constants/message';
import styled from '@lib/styled-components';
import { ChangeEventHandler, Dispatch, FocusEventHandler, SetStateAction, useCallback, useState } from 'react';

interface PasswordProps {
  setPossible: Dispatch<SetStateAction<boolean>>;
}

export default function Password({ setPossible }: PasswordProps) {
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordDuplicateInputValue, setPasswordDuplicateInputValue] = useState('');
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);
  const [passwordDuplicateErrorVisible, setPasswordDuplicateErrorVisible] = useState(false);
  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPasswordInputValue(e.target.value);
  }, []);
  const passwordDuplicateChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPasswordDuplicateInputValue(e.target.value);
  }, []);

  const blurHandler: FocusEventHandler<HTMLInputElement> = () => {
    const regex = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]{8,16}$/;
    const isValidPassword = regex.test(passwordInputValue);
    const isSamePassword = passwordInputValue === passwordDuplicateInputValue;
    setPasswordErrorVisible(!isValidPassword);
    setPasswordDuplicateErrorVisible(!isSamePassword);
    if (isValidPassword && isSamePassword) setPossible(true);
    else setPossible(false);
  };

  return (
    <>
      <Wrapper>
        <Span>비밀번호</Span>
        <Div>
          <ShortInput
            name="password"
            type="password"
            value={passwordInputValue}
            onChange={passwordChangeHandler}
            onBlur={blurHandler}
          />
          {passwordErrorVisible && <ErrorMessage>{ERROR_MESSAGE_PASSWORD}</ErrorMessage>}
        </Div>
      </Wrapper>
      <Wrapper>
        <Span>비밀번호 확인</Span>
        <Div>
          <ShortInput
            type="password"
            value={passwordDuplicateInputValue}
            onChange={passwordDuplicateChangeHandler}
            onBlur={blurHandler}
          />
          {passwordDuplicateErrorVisible && <ErrorMessage>{ERROR_MESSAGE_PASSWORD_DUPLICATE}</ErrorMessage>}
        </Div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.span`
  font-size: 0.5rem;
  margin-left: 20px;
  padding: 1%;
  color: ${({ theme }) => theme.color.red};
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  width: 32%;
  height: 100%;
  padding: 2%;
  color: black;
  background-color: #fcfcf7;
`;

const ShortInput = styled.input`
  width: 40%;
  height: 35px;
  margin-left: 20px;
  border-radius: 5px;
  padding: 1%;
  border: 1px solid lightgray;
  &:focus {
    border: 1px solid black;
  }
`;
