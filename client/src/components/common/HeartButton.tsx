import styled from '@lib/styled-components';
import notify from '@utils/toastify';
import { LOGIN_REQUIRED } from '@constants/message';
import { useState } from 'react';

interface HeartButtonProps {
  initialState?: boolean;
}

const HeartButton = function ({ initialState }: HeartButtonProps) {
  const [toggle, setToggle] = useState(initialState || false);

  const heartClickHandler = () => {
    notify('error', LOGIN_REQUIRED);
  };

  return (
    <LikeButton onClick={heartClickHandler}>
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
