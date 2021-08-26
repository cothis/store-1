import React, { useEffect, ReactNode, useContext, LegacyRef } from 'react';
import { compile, serialize, stringify } from 'stylis';
import { v4 as uuidv4 } from 'uuid';
import type { DefaultTheme } from 'woowa-styled-component';
import TagNames from './tag-names';

type TagName = typeof TagNames[number];

type StyledTagedTemplateLambda = (args: { theme: DefaultTheme; props: Record<string, any> }) => string;
type StyledTagedTemplateArg = StyledTagedTemplateLambda | string;
type StyledComponent = React.ForwardRefExoticComponent<
  Pick<React.PropsWithChildren<any>, string | number> & React.RefAttributes<HTMLElement>
>;
// type StyledComponentProps = { [key: string]: any };
type StyledComponentProps = { [key: string]: any };
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

const $styleTag = document.createElement('style');
document.querySelector('head')!.appendChild($styleTag);

const constructWithTag = (tag?: string) => {
  const CustomTag = `${tag ?? 'div'}` as keyof JSX.IntrinsicElements;

  const construct: StyledTagedTemplate = (
    strings: TemplateStringsArray,
    ...args: StyledTagedTemplateArg[]
  ): StyledComponent => {
    const suffix = uuidv4();
    // tag가 없을 경우 global로 처리
    const className = tag && tag + '-' + suffix;
    const NewComponent: StyledComponent = React.forwardRef<HTMLElement, StyledComponentProps>((props, ref) => {
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
        const $style = document.createTextNode(classString);
        $styleTag.appendChild($style);
        return () => {
          $style.remove();
        };
      }, [props, theme]);
      // TODO: props라고 해도 될지 나중에 고민.

      const domProps: { [key: string]: any } = {};
      if (tag) {
        Object.keys(props)
          .filter((prop) => prop.charAt(0) !== '$')
          .forEach((prop) => (domProps[prop] = props[prop]));
      }

      return (
        <CustomTag
          // @ts-ignore
          ref={ref as LegacyRef<any>}
          {...domProps}
          className={`${className}${props.className ? ' ' + props.className : ''}`}
        >
          {props.children}
        </CustomTag>
      );
    });
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
