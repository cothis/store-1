import { DefaultTheme } from 'woowa-styled-component';
import { css } from '@lib/styled-components/';
import size from '@constants/size';

const theme: DefaultTheme = {
  color: {
    red: '#dc3545',
    redSecondary: '#d36566',
    green: '#198754',
    gray: '#adb5bd',
    blue: '#0d6efd',
    yellow: '#ffc107',
    baeminPrimary: '#2ac1bc',
    baeminDark: '#219a95',
    lightblack: '#333333',
    kakao: '#f7e600',
    borderColor: '#dedede',
    inputBorder: '#c0c0c0',
  },
  opacityHover: css`
    opacity: 1;
    &:hover {
      opacity: 0.9;
    }
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  media: {
    mobileSmall: `${size.mobileSmall}px`,
    mobile: `${size.mobile}px`,
    medium: `${size.medium}px`,
  },
};

export default theme;
