import styled from '@lib/styled-components';
import { TitleWithBorder } from './my-page-style';

export default function MyLike() {
  return (
    <Container>
      <TitleWithBorder>내가 좋아한 상품</TitleWithBorder>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
`;
