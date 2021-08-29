import styled from '@lib/styled-components';
import Up from './Up';
import RecentProduct from './RecentProduct';

export default function SNB() {
  return (
    <SNBWrapper>
      <RecentProduct />
      <Up />
    </SNBWrapper>
  );
}

const SNBWrapper = styled.nav`
  position: fixed;
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  z-index: 9;
  bottom: 3vw;
  right: 3vw;
`;
