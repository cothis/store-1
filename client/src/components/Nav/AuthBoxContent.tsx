import Link from '@lib/router/Link';
import DividerOne from '@assets/images/divider1.png';
import DividerTwo from '@assets/images/divider2.png';
import { useLogout, USER_QUERY_KEY } from '@hooks/query/users';
import { useQueryClient } from 'react-query';

interface Props {
  username: string;
  setAuthToggle: (b: boolean) => void;
}

export function AuthenticatedContent({ username, setAuthToggle }: Props) {
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();

  const logout = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        setAuthToggle(false);
        queryClient.invalidateQueries();
        queryClient.clear();
      },
    });
  };

  return (
    <>
      <div className="box-content">
        <div>
          <span>{username}님</span>
          <button type="button" onClick={logout}>
            로그아웃
          </button>
        </div>
        <p className="dohyeon header">나이스 투 미츄!</p>
      </div>
      <img src={DividerOne} />
      <div
        className="box-content"
        onClick={() => {
          setAuthToggle(false);
        }}
      >
        <Link to="/my-page/edit">
          <p className="dohyeon">내 정보 변경</p>
        </Link>
      </div>
      <img src={DividerTwo} />
      <div
        className="box-content"
        onClick={() => {
          setAuthToggle(false);
        }}
      >
        <Link to="/my-page/like">
          <p className="dohyeon">내가 좋아한 상품</p>
        </Link>
      </div>
      <img src={DividerTwo} />
      <div
        className="box-content"
        onClick={() => {
          setAuthToggle(false);
        }}
      >
        <Link to="/my-page/review">
          <p className="dohyeon">내 상품 후기</p>
        </Link>
      </div>
      <img src={DividerOne} />
      <div
        className="box-content"
        onClick={() => {
          setAuthToggle(false);
        }}
      >
        <Link to="/my-page/qna">
          <p className="dohyeon">내 상품 문의</p>
        </Link>
      </div>
      <img src={DividerTwo} />
      <div
        className="box-content"
        onClick={() => {
          setAuthToggle(false);
        }}
      >
        <Link to="/my-page/orders">
          <p className="dohyeon">내 구매 목록</p>
        </Link>
      </div>
      <img src={DividerTwo} />
    </>
  );
}

export const UnAuthenticatedContent = ({ setAuthToggle }: { setAuthToggle: (b: boolean) => void }) => {
  return (
    <div
      className="required-login"
      onClick={() => {
        setAuthToggle(false);
      }}
    >
      <Link to="/signin">
        <p className="dohyeon">
          로그인이
          <br />
          필요하닭
        </p>
      </Link>
    </div>
  );
};
