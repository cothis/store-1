import useHistory from '@hooks/useHistory';
import { To } from './history';

interface Props {
  to: To;
  push?: boolean;
}

export default function Redirect({ to, push = false }: Props) {
  const history = useHistory();
  if (!history) {
    throw Error('반드시 <Router> 안에서 <Redirect>를 사용하세요.');
  }
  const historyMethod = (push ? history.push : history.replace).bind(history);

  // 맨 처음 Redirect가 실행되면 아직 <Router> 모두 render되지 않아서 신호를 받을 수가 없어서 정상 처리 되지 않습니다.
  // 문제가 있는 코드임에도 일단 이렇게 작성합니다.
  setTimeout(() => {
    historyMethod(to);
  }, 100);

  return null;
}
