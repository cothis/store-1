interface Props {
  resetErrorBoundary: (...args: unknown[]) => void;
  error: unknown;
}

export default function Error({ resetErrorBoundary, error }: Props) {
  return (
    <div>
      <p>global error boundary</p>
      <button
        onClick={() => {
          resetErrorBoundary();
        }}
      >
        reset
      </button>
    </div>
  );
}
