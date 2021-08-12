import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      red: string;
      green: string;
      gray: string;
      blue: string;
      yellow: string;
      baeminPrimary: string;
      baeminDark: string;
    };
  }
}
