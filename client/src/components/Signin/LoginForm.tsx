import useHistory from '@hooks/useHistory';
import styled from '@lib/styled-components';
import axios from '@utils/axios';
import notify from '@utils/toastify';
import { FormEvent, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import usePath from '@hooks/usePath';
import Loading from '@components/Loading';

interface LoginFormData {
  loginId: string;
  password: string;
}

const LOGIN_ID_INPUT_NAME = 'loginId';
const LOGIN_PASSWORD_INPUT_NAME = 'password';

export default function LoginForm() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const login = useMutation((data: LoginFormData) => axios.post('/api/v1/auth/login', data));
  const path = usePath();

  const formRef = useRef<HTMLFormElement>(null);
  const saveId = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) {
      return;
    }

    const data = new FormData(formRef.current);
    const loginId = data.get(LOGIN_ID_INPUT_NAME) as string;
    const password = data.get(LOGIN_PASSWORD_INPUT_NAME) as string;

    const form: LoginFormData = { loginId, password };
    login.mutate(form, {
      onSuccess: () => {
        queryClient.clear();
        if (path.search.redirect) history.replace(path.search.redirect);
        else history.replace('/');
      },
      onError: () => {
        notify('error', '회원정보가 일치하지 않습니다.');
      },
    });
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input name={LOGIN_ID_INPUT_NAME} placeholder="아이디" type="text" required />
      <Input name={LOGIN_PASSWORD_INPUT_NAME} placeholder="비밀번호" type="password" required />
      <CheckboxArea>
        <Checkbox ref={saveId} type="checkbox" />
        <span>아이디 저장</span>
      </CheckboxArea>
      <Hint>
        데모용으로 쉽게 로그인 하세요!
        <br />
        아이디: <strong>demo</strong>, 비밀번호: <strong>demo</strong>
      </Hint>
      <LoginButton disabled={login.isLoading} type="submit">
        {login.isLoading ? <Loading /> : '로그인'}
      </LoginButton>
    </Form>
  );
}

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

const Hint = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;
  line-height: 1.3;
  text-align: center;
`;

const LoginButton = styled.button`
  height: 55px;
  background-color: ${({ theme }) => theme.color.lightblack};
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  border-radius: 5px;
  ${({ theme }) => theme.opacityHover};
  &:disabled {
    height: auto;
    > * {
      margin: 0 !important;
    }
  }
`;
