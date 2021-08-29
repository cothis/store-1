import styled from '@lib/styled-components';
import { MouseEventHandler } from 'react';

interface ButtonPrevProps {
  text?: string;
  clickHandler: MouseEventHandler;
}

const ButtonPrev = function ({ text = '취소', clickHandler }: ButtonPrevProps) {
  return (
    <Button onClick={clickHandler} type="button">
      {text}
    </Button>
  );
};

const Button = styled.button`
  width: 35%;
  height: 45px;
  border: 1px solid #cccccc;
  color: #3e3d3c;
  margin-left: 6px;
  border-radius: 6px;
  @media (max-width: ${({ theme }) => theme.media.mobileSmall}) {
    font-size: 0.7rem;
  }
`;

export default ButtonPrev;
