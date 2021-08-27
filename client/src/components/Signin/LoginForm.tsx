import { API_ENDPOINT } from '@config';
import { USER_QUERY_KEY } from '@hooks/query/users';
import useHistory from '@hooks/useHistory';
import styled from '@lib/styled-components';
import axios from '@utils/axios';
import notify from '@utils/toastify';
import { FormEvent, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

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
        history.push('/');
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
      <LoginButton type="submit">로그인</LoginButton>
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

const LoginButton = styled.button`
  height: 55px;
  background-color: ${({ theme }) => theme.color.lightblack};
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  border-radius: 5px;
  ${({ theme }) => theme.opacityHover};
`;
