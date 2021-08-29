import styled from '@lib/styled-components';
import { MouseEventHandler, ChangeEventHandler, KeyboardEventHandler, FocusEventHandler, useCallback } from 'react';

const MAX_VALUE = 99;
const MIN_VALUE = 1;

interface CountProps {
  count: number;
  setCount: Function;
}

export default function Count({ count, setCount }: CountProps) {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
      setCount(value > MAX_VALUE ? MAX_VALUE : value);
    },
    [setCount],
  );

  const blurHandler: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = Number(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
      if (value === 0) {
        setCount(MIN_VALUE);
      }
    },
    [setCount],
  );

  const keyDownHandler: KeyboardEventHandler = useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (count < MAX_VALUE) setCount(count + 1);
          break;
        case 'ArrowDown':
          if (count > MIN_VALUE) setCount(count - 1);
          break;
      }
    },
    [count, setCount],
  );

  const upClickHandler: MouseEventHandler = useCallback(() => {
    if (count < MAX_VALUE) setCount(count + 1);
  }, [count, setCount]);

  const downClickHandler: MouseEventHandler = useCallback(() => {
    if (count > MIN_VALUE) setCount(count - 1);
  }, [count, setCount]);

  return (
    <Div>
      <Input value={count} onChange={changeHandler} onKeyDown={keyDownHandler} onBlur={blurHandler} />
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
}

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
