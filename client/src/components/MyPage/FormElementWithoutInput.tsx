import styled from '@lib/styled-components';

interface FormElementWithoutInputProps {
  elementName: string;
  isLong?: boolean;
  initialInputValue: string;
}

const FormElementWithoutInput = function ({ elementName, isLong, initialInputValue }: FormElementWithoutInputProps) {
  return (
    <Div>
      <Span>{elementName}</Span>
      {isLong ? <LongContent>{initialInputValue}</LongContent> : <ShortContent>{initialInputValue}</ShortContent>}
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

const ShortContent = styled.span`
  width: 40%;
  height: 35px;
  margin-left: 10px;
  padding: 1%;
`;

const LongContent = styled.span`
  width: 60%;
  height: 35px;
  margin-left: 10px;
  padding: 1%;
`;

export default FormElementWithoutInput;
