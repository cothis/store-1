import { toast } from 'react-toastify';
import size from '@constants/size';

type Type = 'info' | 'success' | 'warning' | 'error' | 'default' | 'dark';

export default function notify(type: Type, msg: string) {
  const position = innerWidth > size.mobile ? 'top-right' : 'top-center';
  switch (type) {
    case 'info':
      toast.info(msg, { position });
      break;
    case 'success':
      toast.success(msg, { position });
      break;
    case 'warning':
      toast.warning(msg, { position });
      break;
    case 'error':
      toast.error(msg, { position });
      break;
    case 'default':
      toast(msg, { position });
      break;
    case 'dark':
      toast.dark(msg, { position });
      break;
    default:
      toast(msg, { position });
      break;
  }
}
