import { createGlobalStyle } from '@lib/styled-components';

export default createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  @font-face {
    font-family: 'NotoSans';
    src: url(${require('../assets/fonts/NotoSansCJKkr-Regular.otf')});
  }
  @font-face {
    font-family: 'DoHyeon';
    src: url(${require('../assets/fonts/BMDOHYEON_otf.otf')});
  }
  * {
    box-sizing: border-box;
    font-family: 'NotoSans', 'DoHyeon', sans-serif;
  }
  #app {
    min-height: 100vh;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color: inherit;
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
