import { css, DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  color: {
    red: '#dc3545',
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
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  `,
};

export default theme;
