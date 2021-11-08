import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      purple: string;
      deepPurple: string;
      grayPurple: string;
      violet: string;
      skyblue: string;
      deepSkyblue: string;
      graySkyblue: string;
      mint: string;
      deepMint: string;
      grayMint: string;
      black: string;
      darkGray: string;
      gray: string;
      paleBlue: string;
      stone: string;
      white: string;
    };
  }
}
