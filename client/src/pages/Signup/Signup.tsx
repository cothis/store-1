import styled from '@lib/styled-components';
import Agreement from '@components/Signup/Agreement';
import { ChangeEvent, MouseEventHandler, useCallback, useRef, useState } from 'react';
import FormElement from '@components/common/FormElement';
import Address from '@components/common/Address';
import useHistory from '@hooks/useHistory';
import Password from '@components/Signup/Password';
import {
  ERROR_MESSAGE_ID,
  ERROR_MESSAGE_NAME,
  ERROR_MESSAGE_EMAIL,
  ERROR_MESSAGE_UNKNOWN,
  ERROR_DUPLICATED,
} from '@constants/message';
import axios from '@utils/axios';
import { useMutation } from 'react-query';
import notify from '@utils/toastify';
import { SIGNUP_ID_INPUT_NAME, SIGNUP_REALNAME_INPUT_NAME, SIGNUP_EMAIL_INPUT_NAME } from '@constants/signup';
import ax from 'axios';

export default function Signup() {
  const form = useRef<HTMLFormElement>(null);
  const history = useHistory();
  const [possibleId, setPossibleId] = useState(false);
  const idValidationFunction = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => /^[A-Za-z0-9]{8,16}$/.test(e.target.value),
    [],
  );
  const [possibleName, setPossibleName] = useState(false);
  const nameValidationFunction = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => e.target.value.length > 0 && e.target.value.length < 11,
    [],
  );
  const [possiblePassword, setPossiblePassword] = useState(false);
  const [possibleEmail, setPossibleEmail] = useState(false);
  const emailValidationFunction = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      e.target.value.length > 0 &&
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        e.target.value,
      ),
    [],
  );
  const [possibleAddress, setPossibleAddress] = useState(false);
  const login = useMutation((data: { [key: string]: string }) => axios.post('/api/v1/users', data));
  const submitHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const body: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      body[key] = value as string;
    });
    login.mutate(body, {
      onSuccess: () => {
        history.push('/signin');
      },
      onError: (error) => {
        if (ax.isAxiosError(error)) {
          if (error.response?.status === 409) notify('error', ERROR_DUPLICATED);
          else notify('error', ERROR_MESSAGE_UNKNOWN);
        }
      },
    });
  };
  return (
    <Wrapper>
      <Title>회원 가입</Title>
      <P>기본정보</P>
      <Form ref={form}>
        <FormElement
          elementName="아이디"
          inputName={SIGNUP_ID_INPUT_NAME}
          type="text"
          isLong
          validationFunction={idValidationFunction}
          setPossible={setPossibleId}
          errorMessage={ERROR_MESSAGE_ID}
        />
        <Password setPossible={setPossiblePassword} />
        <FormElement
          elementName="이름"
          inputName={SIGNUP_REALNAME_INPUT_NAME}
          type="text"
          isLong
          validationFunction={nameValidationFunction}
          setPossible={setPossibleName}
          errorMessage={ERROR_MESSAGE_NAME}
        />
        <FormElement
          elementName="이메일"
          inputName={SIGNUP_EMAIL_INPUT_NAME}
          type="email"
          validationFunction={emailValidationFunction}
          setPossible={setPossibleEmail}
          errorMessage={ERROR_MESSAGE_EMAIL}
        />
        <Address setPossible={setPossibleAddress} />
        <Agreement
          clickHandler={submitHandler}
          possible={
            possibleId && possiblePassword && possibleName && possibleEmail && possibleAddress && !login.isLoading
          }
        />
      </Form>
    </Wrapper>
  );
}

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
