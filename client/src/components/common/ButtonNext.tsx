import styled from '@lib/styled-components';
import { MouseEventHandler } from 'react';

interface ButtonNextProps {
  clickHandler: MouseEventHandler;
  $isPossible: boolean;
  text: string;
}

const ButtonNext = function ({ clickHandler, $isPossible, text }: ButtonNextProps) {
  return (
    <Button onClick={clickHandler} type="button" $isPossible={$isPossible} disabled={!$isPossible}>
      {text}
    </Button>
  );
};

const Button = styled.button`
  opacity: ${({ props }) => (props.$isPossible ? '1' : '0.6')};
  width: 35%;
  height: 45px;
  color: white;
  background-color: black;
  border-radius: 6px;
`;

export default ButtonNext;
