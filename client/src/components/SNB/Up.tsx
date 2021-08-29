import styled from '@lib/styled-components';
import { useEffect, useState, useCallback } from 'react';

const ON_SCROLL_CRITERIA = 200;
export default function Up() {
  const [on, setOn] = useState<boolean>(false);

  const convertOn = useCallback(() => {
    if (window.scrollY > ON_SCROLL_CRITERIA) {
      setOn(true);
    } else {
      setOn(false);
    }
  }, []);

  const goTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', convertOn);
    return () => {
      window.removeEventListener('scroll', convertOn);
    };
  }, []);

  return (
    <UpButton onClick={goTop} className={on ? 'on' : ''}>
      <i className="fas fa-arrow-up"></i>
    </UpButton>
  );
}

const UpButton = styled.button`
  font-size: 1.5rem;
  width: 2em;
  height: 2em;
  background-color: ${({ theme }) => theme.color.baeminPrimary};
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 10px;
  color: white;
  border-radius: 50%;
  opacity: 0;
  transition: 0.5s;
  &.on {
    opacity: 1;
  }
`;
