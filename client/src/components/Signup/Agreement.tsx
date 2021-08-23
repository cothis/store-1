import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import styled from '@lib/styled-components';
import useHistory from '@hooks/useHistory';
import ButtonPrev from '@components/common/ButtonPrev';
import ButtonNext from '@components/common/ButtonNext';

interface AgreementProps {
  clickHandler: MouseEventHandler;
}

const Agreement = function ({ clickHandler }: AgreementProps) {
  const [checkAgreement, setCheckAgreement] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const history = useHistory();

  const bigCheckBoxClickHandler: ChangeEventHandler = () => {
    if (checkAgreement && checkPrivacy) {
      setCheckAgreement(false);
      setCheckPrivacy(false);
    } else {
      setCheckAgreement(true);
      setCheckPrivacy(true);
    }
  };
  const checkAgreementHandler: ChangeEventHandler = () => {
    setCheckAgreement(!checkAgreement);
  };
  const checkPrivacyHandler: ChangeEventHandler = () => {
    setCheckPrivacy(!checkPrivacy);
  };

  const cancelClickHandler: MouseEventHandler = () => {
    history.back();
  };

  return (
    <Wrapper>
      <CheckboxArea>
        <BigCheckbox type="checkbox" onChange={bigCheckBoxClickHandler} checked={checkAgreement && checkPrivacy} />
        <SpanBold>배민문방구의 모든 약관을 확인하고 전체 동의합니다.</SpanBold>
      </CheckboxArea>
      <CheckboxArea>
        <Checkbox type="checkbox" onChange={checkAgreementHandler} checked={checkAgreement} />
        <SpanBold>(필수)</SpanBold>
        <SpanGray>이용약관</SpanGray>
        <ANewPage href="/agreement" target="_blank">
          전체 보기
        </ANewPage>
      </CheckboxArea>
      <CheckboxArea>
        <Checkbox type="checkbox" onChange={checkPrivacyHandler} checked={checkPrivacy} />
        <SpanBold>(필수)</SpanBold>
        <SpanGray>개인정보 수집 및 이용</SpanGray>
        <ANewPage href="/privacy" target="_blank">
          전체 보기
        </ANewPage>
      </CheckboxArea>
      <ButtonArea>
        <ButtonPrev clickHandler={cancelClickHandler} />
        <ButtonNext $isPossible={checkAgreement && checkPrivacy} clickHandler={clickHandler} text="회원가입" />
      </ButtonArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 743px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
`;

const CheckboxArea = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;
`;

const BigCheckbox = styled.input`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const SpanBold = styled.span`
  font-weight: bold;
  margin-right: 4px;
`;

const SpanGray = styled.span`
  color: gray;
`;

const ButtonArea = styled.div`
  margin-top: 5%;
  width: 80%;
  display: flex;
  justify-content: space-around;
`;

const ANewPage = styled.a`
  text-decoration: underline;
  margin-left: 5px;
`;

export default Agreement;
