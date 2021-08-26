import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

interface IPortalProps {
  children: ReactNode;
}

export default function Portal({ children }: IPortalProps) {
  const toastifyRoot = document.getElementById('toastify-root') as HTMLElement;
  return ReactDOM.createPortal(children, toastifyRoot);
}
