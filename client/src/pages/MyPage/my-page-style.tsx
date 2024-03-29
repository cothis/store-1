import styled from '@lib/styled-components';

export const TitleWithBorder = styled.h1`
  margin-bottom: 1.2rem;
  padding-bottom: 1.2rem;

  font-size: 1.5rem;
  font-weight: bold;

  border-bottom: 1px solid lightgray;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-bottom: 0.8rem;
    padding-bottom: 0.8rem;
    font-size: 1.2rem;
    border-bottom: none;
  }
`;

export const Container = styled.div`
  padding: 0.5rem;

  .products__content--empty {
    padding: 0.5em 0;
    ${({ theme }) => theme.flexCenter};
    font-size: 7rem;
    font-family: 'Do Hyeon', sans-serif;
  }
`;
