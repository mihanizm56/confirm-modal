import { ComponentType, FunctionComponent, MouseEvent } from 'react';
import { ButtonSize, ButtonVariant } from '@/_types';
import { FontSizeType } from '../text/_types';

export type BasePropsType = {
  /** отображение иконки в кнопке */
  children?: ComponentType<any> | FunctionComponent<any>;
  /** флаг рабочего состояния кнопки */
  disabled?: boolean;
  /** флаг устанавливающий width: 100% */
  fullWidth?: boolean;
  /** флаг для вне текста, в хлебной крошки ссылки */
  isBreadcrumbs?: boolean;
  /** флаг темной темы */
  isDarkTheme?: boolean;
  /** флаг отображения процесса загрузки внутри кнопки */
  isLoading?: boolean;
  /** флаг (без перезагрузки страницы) для попап / часть текста  */
  isPopUp?: boolean;
  /** флаг, устанавливающий текст в центр */
  isTextCenter?: boolean;
  /** href для ссылки */
  routeName?: string;
  /** размер кнопки */
  size?: ButtonSize;
  /** содержание текста */
  text?: string;
  /** выбор заголовка в кнопке */
  textSize?: FontSizeType;
  /** флаг регистра текста в кнопке */
  textUpperCase?: boolean;
  /** степень важности кнопки */
  variant?: ButtonVariant;
};

export type TargetType = '_blank' | '_self' | '_parent' | '_top';

export type ClassNameType = { [key: string]: boolean };

export type ButtonClickEventType = {
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>;
  routeName?: string;
};

export type AnchorPropsType = {
  href: string;
  target?: string;
};
export type ButtonPropsType = {
  disabled?: boolean;
  type?: string;
};

export type TagOptionalPropsType = AnchorPropsType | ButtonPropsType;
