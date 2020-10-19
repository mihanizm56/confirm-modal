import React, {
  ComponentType,
  FunctionComponent,
  RefObject,
  MouseEvent,
  useCallback,
  useMemo,
  memo,
} from 'react';
import { ButtonType } from '@/_types';
import { ButtonLinkView } from './_components/button-link-view';
import { BasePropsType, ButtonClickEventType, TargetType } from './_types';
import { getTagProps } from './_utils/get-tag-props';

export type ButtonLinkPropsType = BasePropsType & {
  /** реф на иконочную кнопку */
  buttonRef?: RefObject<HTMLButtonElement>;
  /** флаг рабочего состояния кнопки */
  disabled?: boolean;
  /** коллбек-обработчик клика по кнопке */
  onClick?: (buttonEvent: ButtonClickEventType) => void;
  /** функциональный тип открывания страницы */
  target?: TargetType;
  /** функциональный тип кнопки */
  type?: ButtonType;
  /** флаг отображения прелоадера в кнопке (deprecated) */
  withLoader?: boolean;
  /** компонент иконки для отображение в кнопке справа */
  rightIcon?: ComponentType<any> | FunctionComponent<any>;
};

export const ButtonLink = memo(
  ({
    children,
    disabled,
    fullWidth,
    isBreadcrumbs,
    isDarkTheme,
    isLoading = false,
    isPopUp,
    isTextCenter,
    onClick = () => false,
    rightIcon,
    routeName,
    size = 'big',
    target,
    text,
    textSize = 'h4',
    textUpperCase,
    type = 'button',
    variant = 'main',
    withLoader,
  }: ButtonLinkPropsType) => {
    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if ((type !== 'submit' || routeName) && target !== '_blank') {
          event.preventDefault();
        }
        if (!isLoading) {
          onClick({ event, routeName });
        }
      },
      [type, routeName, target, isLoading, onClick],
    );

    const tagOptionalProps = useMemo(
      () => getTagProps({ disabled, routeName, target, type }),
      [disabled, routeName, target, type],
    );

    const Tag: string = useMemo(() => (routeName ? 'a' : 'button'), [
      routeName,
    ]);

    return (
      <ButtonLinkView
        fullWidth={fullWidth}
        isBreadcrumbs={isBreadcrumbs}
        isDarkTheme={isDarkTheme}
        isLoading={isLoading}
        isPopUp={isPopUp}
        isTextCenter={isTextCenter}
        isUpperCase={textUpperCase}
        leftIcon={children}
        onClick={handleClick}
        rightIcon={rightIcon}
        routeName={routeName}
        size={size}
        tagName={Tag}
        tagOptionalProps={tagOptionalProps}
        text={text}
        textSize={textSize}
        variant={variant}
        withLoader={withLoader}
      />
    );
  },
);
