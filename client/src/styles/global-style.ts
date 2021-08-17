import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset};
  @font-face {
    font-family: 'NotoSans';
    src: url(${require('./fonts/NotoSansCJKkr-Regular.otf')});
  }
  @font-face {
    font-family: 'DoHyeon';
    src: url(${require('./fonts/BMDOHYEON_otf.otf')});
  }
  * {
      box-sizing: border-box;
      user-select: none;
      font-family: 'NotoSans', 'DoHyeon', sans-serif;
  }
  a {
      text-decoration: none;
  }
  button {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    color: inherit;
    font: inherit;
    &:hover {
      cursor: pointer;
    }
  }
  input,
  button,
  select,
  textarea {
    &:focus {
        outline: none;
    }
  }
`;
