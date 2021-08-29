import styled from '@lib/styled-components';
import FormElement from '@components/common/FormElement';
import FormElementWithoutInput from '@components/MyPage/FormElementWithoutInput';
import Address from '@components/common/Address';
import ButtonNext from '@components/common/ButtonNext';
import ButtonPrev from '@components/common/ButtonPrev';
import useHistory from '@hooks/useHistory';
import { MouseEventHandler, useRef } from 'react';
import Password from '@components/Signup/Password';
import { useUser } from '@hooks/query/users';
import Loading from '@components/Loading';
import notify from '@utils/toastify';
import { ERROR_MESSAGE_UNKNOWN } from '@constants/message';
import { useMutation } from 'react-query';
import axios from '@utils/axios';

export default function MyPageEdit() {
  const { data, isLoading, isError, error } = useUser();
  const history = useHistory();
  const form = useRef<HTMLFormElement>(null);
  const updateUser = useMutation((updateData: { [key: string]: string }) =>
    axios.put(`/api/v1/users/${data?.id}`, updateData),
  );
  if (isError) history.push({ pathname: '/' });
  if (isLoading) return <Loading />;
  if (!data) return <></>;

  const cancelClickHandler: MouseEventHandler = () => {
    history.back();
  };
  const submitClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const body: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      body[key] = value as string;
    });
    body.realName = data.name;
    if (!data.loginId) body.email = data.email;
    updateUser.mutate(body, {
      onSuccess: () => {
        notify('success', '정보 변경을 성공했습니다.');
      },
      onError: () => {
        notify('error', ERROR_MESSAGE_UNKNOWN);
      },
    });
  };
  return (
    <Form ref={form}>
      <Title>회원정보 변경</Title>
      {data.loginId ? (
        <FormElementWithoutInput elementName="아이디" isLong initialInputValue={data.loginId} />
      ) : (
        <FormElementWithoutInput elementName="계정 방식" isLong initialInputValue="카카오" />
      )}
      <FormElementWithoutInput elementName="이름" isLong initialInputValue={data.name} />
      {data.loginId ? (
        <FormElement elementName="이메일" inputName="email" type="email" initialInputValue={data.email} />
      ) : (
        <FormElementWithoutInput elementName="이메일" initialInputValue={data.email} />
      )}
      {data.loginId && <Password setPossible={() => {}} />}
      <Address initialZipcode={data.zipcode} initialAddress={data.address} initialAddressDetail={data.addressDetail} />
      <ButtonArea>
        <ButtonPrev clickHandler={cancelClickHandler} />
        <ButtonNext clickHandler={submitClickHandler} $isPossible={true} text="정보 수정" />
      </ButtonArea>
    </Form>
  );
}

const Form = styled.form`
  max-width: 960px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 2.4rem;
  padding-bottom: 1.2rem;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 1.2rem;
  }
`;

const ButtonArea = styled.div`
  margin-top: 5%;
  width: 40%;
  display: flex;
  justify-content: space-around;
`;
