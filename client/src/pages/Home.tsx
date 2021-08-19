import styled from '@lib/styled-components';

const Div = styled.div`
  color: ${({ theme }) => theme.color.red};
`;

const Button = styled.button`
  ${({ theme }) => theme.opacityHover}
`;

const H1 = styled.h1`
  background-color: black;
  &:hover {
    background-color: white;
  }
  color: ${({ props }) => props.color};
`;

const Home = () => {
  return (
    <div>
      <Div>
        <H1 color={'yellow'}>home 입니당</H1>
      </Div>

      <Button>어어어</Button>
    </div>
  );
};

export default Home;
