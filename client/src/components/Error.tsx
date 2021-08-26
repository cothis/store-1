import styled from '@lib/styled-components';
import tearsImg from '@assets/images/tears.png';
interface Props {
  resetErrorBoundary: (...args: unknown[]) => void;
  error: unknown;
}

export default function Error({ resetErrorBoundary, error }: Props) {
  return (
    <ErrorWrapper>
      <h3>앗</h3>
      <p>화면을 불러오지 못했어요</p>
      <img src={tearsImg} alt="눈물 이미지" />
      <button
        onClick={() => {
          resetErrorBoundary();
        }}
      >
        다시시도
      </button>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  > * {
    margin: 1rem 0;
  }
  h3 {
    font-family: 'Do Hyeon', sans-serif;
    font-size: 6rem;
  }
  p {
    font-size: 1.2rem;
    font-weight: bold;
  }
  button {
    font-size: 1.2rem;
    padding: 1em;
    border: 1px solid #ddd;
  }
`;
