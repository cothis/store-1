import styled from '@lib/styled-components';
const circleCenterArr = [
  { cx: '110', cy: '35' },
  { cx: '163', cy: '57' },
  { cx: '185', cy: '110' },
  { cx: '163', cy: '163' },
  { cx: '110', cy: '185' },
  { cx: '57', cy: '163' },
  { cx: '35', cy: '110' },
  { cx: '57', cy: '57' },
];
export default function Loading() {
  const circleRadius = '15';
  return (
    <LoadingWrapper>
      <svg viewBox="0 0 220 220" width="60" height="60" className="loading__svg">
        {circleCenterArr.map(({ cx, cy }, idx) => {
          return (
            <circle
              key={`circle-${idx}`}
              className="loading__svg__circle"
              cx={cx}
              cy={cy}
              r={circleRadius}
              style={{
                animationDelay: `${idx * 0.15}s`,
              }}
            />
          );
        })}
      </svg>
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  height: 100%;
  .loading__svg__circle {
    fill: ${({ theme }) => theme.color.baeminDark};
    opacity: 0.3;
    transform: scale(1.1);
    transform-origin: center;
    animation: circle-animation 0.6s infinite alternate cubic-bezier(0, 0, 1, 1);
  }
  @keyframes circle-animation {
    to {
      opacity: 1;
      transform: scale(1.15);
    }
  }
`;
