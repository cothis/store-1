import styled from '@lib/styled-components';
import { ChangeEventHandler, useState } from 'react';

interface FormElementProps {
  elementName: string;
  inputName?: string;
  type: string;
  isLong?: boolean;
}

const FormElement = ({ elementName, inputName, type, isLong }: FormElementProps) => {
  const [inputValue, setInputValue] = useState('');
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <Div>
      <Span>{elementName}</Span>
      {isLong ? (
        <LongInput name={inputName} type={type} value={inputValue} onChange={changeHandler} />
      ) : (
        <ShortInput name={inputName} type={type} value={inputValue} onChange={changeHandler} />
      )}
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  width: 25%;
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

const LongInput = styled.input`
  width: 60%;
  height: 35px;
  margin-left: 20px;
  border-radius: 5px;
  padding: 1%;
  border: 1px solid lightgray;
  &:focus {
    border: 1px solid black;
  }
`;

export default FormElement;
