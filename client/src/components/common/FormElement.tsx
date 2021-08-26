import styled from '@lib/styled-components';
import { ChangeEvent, ChangeEventHandler, Dispatch, FocusEventHandler, SetStateAction, useState } from 'react';

interface FormElementProps {
  elementName: string;
  inputName?: string;
  type: string;
  isLong?: boolean;
  initialInputValue?: string;
  readonly?: boolean;
  validationFunction?: (e: ChangeEvent<HTMLInputElement>) => boolean;
  setPossible?: Dispatch<SetStateAction<boolean>>;
  errorMessage?: string;
}
export default function FormElement({
  elementName,
  inputName,
  type,
  isLong,
  initialInputValue,
  readonly,
  validationFunction,
  setPossible,
  errorMessage,
}: FormElementProps) {
  const [inputValue, setInputValue] = useState(initialInputValue || '');
  const [errorVisible, setErrorVisible] = useState(false);
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (validationFunction && setPossible) setPossible(validationFunction(e));
    setInputValue(e.target.value);
  };
  const blurHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    if (validationFunction) setErrorVisible(!validationFunction(e));
  };
  return (
    <Wrapper>
      <Span>{elementName}</Span>
      <Div>
        {isLong ? (
          <LongInput
            name={inputName}
            type={type}
            value={inputValue}
            onChange={changeHandler}
            onBlur={blurHandler}
            readOnly={readonly}
          />
        ) : (
          <ShortInput
            name={inputName}
            type={type}
            value={inputValue}
            onChange={changeHandler}
            onBlur={blurHandler}
            readOnly={readonly}
          />
        )}
        {errorVisible && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Div>
    </Wrapper>
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
