import styled from '@lib/styled-components';
import { ChangeEventHandler, useState, CSSProperties, Dispatch, SetStateAction, FocusEventHandler } from 'react';
import DaumPostcode, { AddressData } from 'react-daum-postcode';
import useModal from '@hooks/useModal';
import {
  SIGNUP_ADDRESS_DETAIL_INPUT_NAME,
  SIGNUP_ADDRESS_INPUT_NAME,
  SIGNUP_ZIPCODE_INPUT_NAME,
} from '@constants/signup';

interface AddressProps {
  initialZipcode?: string;
  initialAddress?: string;
  initialAddressDetail?: string;
  setPossible?: Dispatch<SetStateAction<boolean>>;
}

export default function Address({ initialZipcode, initialAddress, initialAddressDetail, setPossible }: AddressProps) {
  const [zipcode, setZipcode] = useState(initialZipcode || '');
  const [address, setAddress] = useState(initialAddress || '');
  const [addressDetail, setAddressDetail] = useState(initialAddressDetail || '');
  const [modal, setModal] = useModal();
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAddressDetail(e.target.value);
  };
  const completeHandler = (data: AddressData) => {
    setModal(false);
    setZipcode(data.zonecode);
    setAddress(data.roadAddress);
  };
  const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    if (setPossible) setPossible(zipcode.length > 0 && address.length > 0 && addressDetail.length > 0);
  };

  return (
    <Div>
      <Span>주소</Span>
      <InputArea>
        <div>
          <ShortInput name={SIGNUP_ZIPCODE_INPUT_NAME} type="text" value={zipcode} readOnly />
          <Button
            type="button"
            onClick={() => {
              setModal(true);
            }}
          >
            우편번호검색
          </Button>
          <Modal $modal={modal}>
            <DaumPostcode style={DaumPostcodeStyle} onComplete={completeHandler} />
            <ModalBackground
              onClick={() => {
                setModal(false);
              }}
            />
          </Modal>
        </div>
        <LongInput name={SIGNUP_ADDRESS_INPUT_NAME} type="text" value={address} readOnly />
        <LongInput
          name={SIGNUP_ADDRESS_DETAIL_INPUT_NAME}
          type="text"
          value={addressDetail}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      </InputArea>
    </Div>
  );
}

const DaumPostcodeStyle: CSSProperties = {
  width: '50%',
  position: 'absolute',
  top: '70%',
  left: '75%',
  zIndex: 11,
  transform: 'translate(-100%,-100%)',
};

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  width: 32%;
  height: 180px;
  padding: 2%;
  color: black;
  background-color: #fcfcf7;
`;

const Modal = styled.div`
  display: ${({ props }) => (props.$modal ? 'block' : 'none')};
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
`;

const Button = styled.button`
  width: 100px;
  height: 35px;
  margin-left: 20px;
  border: 1px solid lightgray;
`;

const ShortInput = styled.input`
  width: 20%;
  height: 35px;
  margin-left: 20px;
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 1%;
  border: 1px solid lightgray;
  &:focus {
    border: 1px solid black;
  }
`;

const LongInput = styled.input`
  width: 80%;
  height: 35px;
  margin-left: 20px;
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 1%;
  border: 1px solid lightgray;
  &:focus {
    border: 1px solid black;
  }
`;

const ModalBackground = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  background-color: black;
  opacity: 0.5;
`;
