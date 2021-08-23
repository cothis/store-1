import styled from '@lib/styled-components';

interface TermsProps {
  title: string;
  context: string;
}

const Agreement = ({ title, context }: TermsProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>
        {context.split('\n').map((line) => {
          return (
            <span>
              {line}
              <br />
            </span>
          );
        })}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 70px auto;
`;

const Title = styled.h1`
  width: 100%;
  border-bottom: 1px solid gray;
  font-weight: bold;
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const Content = styled.div`
  width: 100%;
  font-size: 12px;
  color: #333;
  line-height: 1.5;
`;

export default Agreement;
