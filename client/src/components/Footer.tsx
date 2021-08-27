import styled from '@lib/styled-components';
import baeminLogoImg from '@assets/images/baemin_store_logo.png';
import NavLink from '@lib/router/NavLink';

const footerInfo = [
  '상호 : (주)잘시간이없조 | 대표 : 김태관호 | 사업자등록번호 : 123-45-67890 | 통신판매업신고번호 : 2021-꿈나라-0827',
  '팩스번호 : 050-123-1234 | 메일 : sleep@notime.com | 인스타그램 : @want_sleep',
  '주소 : 꿈나라특별시 침구 이불로 9 베개빌딩',
  '© Sleep Time Corp. All right Reserved',
];

export default function Footer() {
  return (
    <FooterWrapper>
      <img className="footer__img--logo" src={baeminLogoImg} alt="배민 문방구 로고 이미지" />
      <div className="footer__content">
        <div className="footer__content--links">
          <NavLink goTop to={{ pathname: '/board', search: { type: 'notice' } }}>
            공지사항
          </NavLink>
          <NavLink goTop to={{ pathname: '/agreement' }}>
            이용약관
          </NavLink>
          <NavLink goTop to={{ pathname: '/privacy' }}>
            개인정보처리방침
          </NavLink>
        </div>
        <div className="footer__content--info">
          {footerInfo.map((text, idx) => (
            <p key={`footer-info-${idx}`}>{text}</p>
          ))}
        </div>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 1rem;
  background-color: #f5f5f5;
  ${({ theme }) => theme.flexCenter};
  > * {
    margin: 0 1rem;
  }
  .footer__img--logo {
    width: 170px;
  }
  .footer__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .footer__content--links {
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 1rem;
  }
  .footer__content--info {
    font-size: 0.7rem;
    color: #aaa;
    > p {
      margin: 0.5em 0;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .footer__img--logo {
      display: none;
    }
  } ;
`;
