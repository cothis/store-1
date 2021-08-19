import Link from '@lib/router/Link';
import DividerOne from '@assets/images/divider1.png';
import DividerTwo from '@assets/images/divider2.png';

export const AuthenticatedContent = ({
  username,
  setAuthToggle,
}: {
  username: string;
  setAuthToggle: (b: boolean) => void;
}) => {
  return (
    <>
      <div className="box-content">
        <span>{username}님</span>
        <p className="dohyeon header">나이스 투 미츄!</p>
      </div>
      <img src={DividerOne} />
      <div
        className="box-content"
        onClick={() => {
          setAuthToggle(false);
        }}
      >
        <Link to="/my-page">
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
    </>
  );
};

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
