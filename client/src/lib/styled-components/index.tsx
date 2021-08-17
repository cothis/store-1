import React, { useEffect, ReactNode, useContext } from 'react';
import { compile, serialize, stringify } from 'stylis';
import { generatorHashName } from './utils';
import type { DefaultTheme } from 'woowa-styled-component';
import TagNames from './tag-names';

type TagName = typeof TagNames[number];

export interface StyledComponentProps {
  children?: ReactNode;
  [key: string]: any;
}

type StyledTagedTemplateLambda = (args: { theme: DefaultTheme; props: Record<string, any> }) => string;
type StyledTagedTemplateArg = StyledTagedTemplateLambda | string;

type StyledComponent = (props: StyledComponentProps) => JSX.Element;
type StyledTagedTemplate = (strings: TemplateStringsArray, ...args: StyledTagedTemplateArg[]) => StyledComponent;
type Styled = Record<TagName, StyledTagedTemplate>;

const ThemeContext = React.createContext<DefaultTheme | null>(null);
ThemeContext.displayName = 'ThemeContext';

const ThemeProvider = (props: { theme: DefaultTheme; children?: ReactNode }) => {
  return <ThemeContext.Provider value={props.theme}>{props.children}</ThemeContext.Provider>;
};

const stylis = (content: string, className?: string) => {
  if (!className) {
    return serialize(compile(`${content}`), stringify);
  } else {
    return serialize(compile(`.${className}{${content}}`), stringify);
  }
};

const constructWithTag = (tag?: string) => {
  const CustomTag = `${tag ?? 'div'}` as keyof JSX.IntrinsicElements;

  const construct: StyledTagedTemplate = (
    strings: TemplateStringsArray,
    ...args: StyledTagedTemplateArg[]
  ): StyledComponent => {
    const NewComponent = (props: StyledComponentProps) => {
      const suffix = generatorHashName();
      // tag가 없을 경우 global로 처리
      const className = tag && tag + '-' + suffix;
      const theme = useContext(ThemeContext)!;

      // Lazy Evalution!! 와! 대단해!
      useEffect(() => {
        const css = strings
          .map((string, i) => {
            let arg = args[i] ?? '';
            if (arg instanceof Function) {
              arg = arg({ theme, props });
            }
            return `${string}${arg}`;
          })
          .join('');
        const classString = stylis(css, className);
        const $style = document.createElement('style');
        $style.innerHTML = classString;
        document.querySelector<HTMLHeadElement>('head')!.appendChild($style);
        return () => {
          $style.remove();
        };
      }, [props, theme]);
      // TODO: props라고 해도 될지 나중에 고민.

      const domProps: { [key: string]: any } = {};
      if (tag) {
        Object.keys(props).forEach((prop) => {
          if (prop in HTMLElement.prototype) {
            domProps[prop] = props[prop];
          }
        });
      }

      return (
        <CustomTag {...domProps} className={className}>
          {props.children}
        </CustomTag>
      );
    };
    return NewComponent;
  };

  return construct;
};

const styled: Styled = {} as Styled;

TagNames.forEach((domElement) => {
  styled[domElement] = constructWithTag(domElement);
});

export const createGlobalStyle = constructWithTag();

const css = (strings: TemplateStringsArray, ...args: string[]) =>
  strings.map((string, i) => `${string}${args[i] ?? ''}`).join('');

export { css, ThemeProvider, ThemeContext };
export default styled;
