import styled from '@lib/styled-components';
import { MouseEventHandler, useCallback } from 'react';

interface CountProps {
  count: number;
  setCount: Function;
}

const MAX_VALUE = 99;
const MIN_VALUE = 1;

const Count = function ({ count, setCount }: CountProps) {
  const changeHandler = useCallback((e) => {
    const value = Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
    setCount(value > MAX_VALUE ? MAX_VALUE : value);
  }, []);
  const upClickHandler: MouseEventHandler = () => {
    if (count < MAX_VALUE) setCount(count + 1);
  };
  const downClickHandler: MouseEventHandler = () => {
    if (count > MIN_VALUE) setCount(count - 1);
  };
  return (
    <Div>
      <Input value={count} onChange={changeHandler} />
      <ButtonArea>
        <Button onClick={upClickHandler} disabled={count >= MAX_VALUE}>
          <i className="fas fa-chevron-up"></i>
        </Button>
        <Button onClick={downClickHandler} disabled={count <= MIN_VALUE}>
          <i className="fas fa-chevron-down"></i>
        </Button>
      </ButtonArea>
    </Div>
  );
};

const Div = styled.div`
  width: 65px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonArea = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 70%;
  height: 100%;
  border: 1px solid lightgray;
  border-right: none;
  padding: 4px;
`;

const Button = styled.button`
  width: 100%;
  height: 50%;
  border: 1px solid lightgray;
  &:disabled {
    opacity: 0.3;
  }
`;

export default Count;
