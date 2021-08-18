import { MouseEventHandler } from 'react';

type ExitProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  absolute?: boolean;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
  width: string;
  height: string;
  color: string;
  strokeWidth: string;
};

const ExitBtn = ({
  absolute,
  top,
  left,
  bottom,
  right,
  width,
  height,
  color,
  strokeWidth,
  onClick,
  transform,
}: ExitProps) => {
  return (
    <button
      style={{
        position: absolute ? 'absolute' : 'static',
        transform: transform ? transform : '',
        top: top ? top : '',
        bottom: bottom ? bottom : '',
        left: left ? left : '',
        right: right ? right : '',
        width,
        height,
      }}
      type="button"
      onClick={onClick}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <line style={{ stroke: color, strokeWidth, strokeLinecap: 'round' }} x1="30" y1="30" x2="70" y2="70" />
        <line style={{ stroke: color, strokeWidth, strokeLinecap: 'round' }} x1="70" y1="30" x2="30" y2="70" />
      </svg>
    </button>
  );
};

export default ExitBtn;
