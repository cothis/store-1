import styled from '@lib/styled-components';
import { useState } from 'react';

interface HeartButtonProps {
  initialState?: boolean;
}

const HeartButton = function ({ initialState }: HeartButtonProps) {
  const [toggle, setToggle] = useState(initialState || false);
  return (
    <LikeButton
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      {toggle ? <i className="fas fa-heart" /> : <i className="far fa-heart" />}
    </LikeButton>
  );
};

const LikeButton = styled.button`
  width: 45px;
  height: 45px;
  border: 1px solid #cccccc;
  margin-right: 6px;
  margin-left: auto;
  border-radius: 6px;
  > i {
    color: ${({ theme }) => theme.color.baeminPrimary};
  }
`;

export default HeartButton;
