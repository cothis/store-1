import { AuthenticatedContent, UnAuthenticatedContent } from './AuthBoxContent';
import useModal from '@hooks/useModal';
import styled from '@lib/styled-components';
import BabImg from '@assets/images/bab.png';
import TearsImg from '@assets/images/tears.png';

const Auth = () => {
  let login = false;
  let username = 'jiyong';
  const [authToggle, setAuthToggle] = useModal();

  return (
    <>
      <button
        className="auth-btn"
        onClick={(e) => {
          setAuthToggle(!authToggle);
        }}
      >
        <i className="fas fa-user"></i>
      </button>
      <AuthBox className={authToggle ? 'on' : ''}>
        {login ? (
          <AuthenticatedContent username={username} setAuthToggle={setAuthToggle} />
        ) : (
          <UnAuthenticatedContent setAuthToggle={setAuthToggle} />
        )}
        <img className="auth-icon" style={{ display: login ? 'block' : 'none' }} src={BabImg} alt="밥 캐릭터"></img>
        <img
          className="auth-icon"
          style={{ display: login ? 'none' : 'block' }}
          src={TearsImg}
          alt="눈물 흘리는 캐릭터"
        ></img>
      </AuthBox>

      <AuthBg
        style={{
          display: authToggle ? 'block' : 'none',
        }}
        onClick={() => {
          setAuthToggle(false);
        }}
      />
    </>
  );
};

const AuthBox = styled.div`
  @keyframes auth-icon-in {
    to {
      transform: translate3d(-50%, -100%, 0);
    }
  }
  position: absolute;
  overflow: auto;
  z-index: 1;
  top: 0;
  left: 100%;
  width: 80vw;
  max-width: 300px;
  height: 100vh;
  background-color: white;
  transition: 0.5s;
  img:not(.auth-icon) {
    width: 100%;
  }
  > img.auth-icon {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    max-width: 240px;
  }
  &.on {
    transform: translateX(-100%);
    > img.auth-icon {
      animation: auth-icon-in 0.5s forwards;
      animation-delay: 0.5s;
    }
  }
  p.dohyeon {
    font-family: 'Do Hyeon', sans-serif;
  }
  > .box-content {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.1rem;
    > * {
      width: 100%;
    }
    span,
    p {
      margin: 0.4em 0;
    }
    p.dohyeon.header {
      font-size: 1.3rem;
    }
  }
  > .required-login {
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em 0;
    p {
      line-height: 2em;
    }
  }
`;

const AuthBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default Auth;
