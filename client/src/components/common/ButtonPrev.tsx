import styled from '@lib/styled-components';
import { MouseEventHandler } from 'react';

interface ButtonPrevProps {
  clickHandler: MouseEventHandler;
}

const ButtonPrev = function ({ clickHandler }: ButtonPrevProps) {
  return (
    <Button onClick={clickHandler} type="button">
      취소
    </Button>
  );
};

const Button = styled.button`
  width: 35%;
  height: 45px;
  border: 1px solid #cccccc;
  color: #3e3d3c;
`;

export default ButtonPrev;
