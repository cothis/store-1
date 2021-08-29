import styled from '@lib/styled-components';
import { FunctionComponent } from 'react';
import MenuBar from './MenuBar';

interface MyPageLayoutProps {
  component: FunctionComponent;
}

export default function MyPageLayout({ component: Component }: MyPageLayoutProps) {
  return (
    <Wrapper>
      <MenuBar />
      <Content>
        <Component />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  flex-direction: row;
  padding: 1%;
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
  }
`;

const Content = styled.div`
  max-width: 960px;
  width: 100%;
  margin-bottom: 20%;
`;

const Dohyeon = styled.h2`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 3rem;
  margin-bottom: 5%;
`;
