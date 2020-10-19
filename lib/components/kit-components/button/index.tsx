import React, {
  FC,
  useCallback,
  RefObject,
  ComponentType,
  FunctionComponent,
  useMemo,
  memo,
  SyntheticEvent,
} from 'react';
import classnames from 'classnames/bind';
import { FontSizeType } from '@/components/kit-components/text/_types';
import { BasicPlusIcon } from '@/components/kit-components/icons/basic-plus-icon';
import { BasicClearIcon } from '@/components/kit-components/icons/basic-clear-icon';
import { BasicMenuIcon } from '@/components/kit-components/icons/basic-menu-icon';
import { Overlay } from '@/components/kit-components/overlay';
import { Preloader } from '../preloader';
import styles from './index.module.scss';
import {
  ButtonVariant,
  ButtonSize,
  ButtonType,
  DarkThemePresets,
  ButtonClickEventType,
} from './_types';
import { preloaderColor } from './_utils/preloader-color';

const cn = classnames.bind(styles);
const BUTTON_OVERLAY_TIMEOUT = 150;

type ButtonPropsType = {
  /** реф на иконочную кнопку */
  buttonRef?: RefObject<HTMLButtonElement>;
  /** отображение иконки в кнопке */
  children?: ComponentType<any> | FC<any> | FunctionComponent<any>;
  /** кнопка в темном интерфейсе */
  darkThemePreset?: DarkThemePresets;
  /** флаг рабочего состояния кнопки */
  disabled?: boolean;
  /** флаг устанавливающий width: 100% */
  fullWidth?: boolean;
  /** флаг отображения процесса загрузки внутри кнопки */
  isLoading?: boolean;
  /** флаг, устанавливающий текст в центр */
  isTextCenter?: boolean;
  /** коллбек-обработчик клика по кнопке */
  onClick?: (optionClickEvent: ButtonClickEventType) => void;
  /** размер кнопки */
  size?: ButtonSize;
  /** содержание текста */
  text?: string;
  /** выбор заголовка в кнопке */
  textSize?: FontSizeType;
  /** флаг регистра текста в кнопке */
  textUpperCase?: boolean;
  /** функциональный тип кнопки */
  type?: ButtonType;
  /** степень важности кнопки */
  variant?: ButtonVariant;
  /** флаг отображения прелоадера в кнопке */
  withLoader?: boolean;
  /** флаг выбора иконки меню в adaptive варианте кнопки */
  adaptiveMenu?: boolean;
  /** флаг выбора иконки крестика в adaptive варианте кнопки */
  adaptiveClose?: boolean;
};

const allButtonVariants = [
  'main',
  'accent',
  'interface',
  'neutral',
  'positive',
  'negative',
  'remove',
];

export const Button: FC<ButtonPropsType> = memo(
  ({
    text,
    type = 'button',
    size,
    onClick = () => false,
    disabled,
    variant,
    textUpperCase,
    isLoading,
    withLoader,
    children: Icon,
    fullWidth,
    darkThemePreset,
    isTextCenter,
    adaptiveMenu,
    adaptiveClose,
  }: ButtonPropsType) => {
    const needPreloader = useMemo(
      () => allButtonVariants.includes(variant || darkThemePreset || ''),
      [variant, darkThemePreset],
    );

    const textNegative = useMemo(
      () => darkThemePreset === 'negative' && size === 'small',
      [darkThemePreset, size],
    );

    const textNeutral = useMemo(
      () => darkThemePreset === 'neutral' && size === 'small',
      [darkThemePreset, size],
    );

    const textPositive = useMemo(
      () => darkThemePreset === 'positive' && size === 'small',
      [darkThemePreset, size],
    );

    const handleButtonClick = useCallback(
      (event: SyntheticEvent<HTMLButtonElement>) => {
        if (type !== 'submit') {
          event.stopPropagation();
        }
        if (!isLoading || variant !== 'success') {
          onClick({ event });
        }
      },
      [isLoading, onClick, type, variant],
    );

    const preloaderColorCheck = useMemo(
      () => preloaderColor({ variant, darkThemePreset }),
      [variant, darkThemePreset],
    );

    const iconSingle = useMemo(
      () => Icon && !text && !(variant === 'adaptive'),
      [Icon, text, variant],
    );

    const buttonDarkVariant = useMemo(
      () => Boolean(darkThemePreset) && size === 'small' && !variant,
      [darkThemePreset, size, variant],
    );

    const iconNoVariantBig = useMemo(
      () =>
        Boolean(!text) &&
        !Boolean(variant) &&
        !Boolean(darkThemePreset) &&
        size === 'big',
      [text, variant, darkThemePreset, size],
    );

    const iconNoVariantSmall = useMemo(
      () =>
        Boolean(!text) &&
        !Boolean(variant) &&
        !Boolean(darkThemePreset) &&
        size === 'small',
      [text, variant, darkThemePreset, size],
    );

    const adaptiveIconClose = useMemo(
      () => !text && variant === 'adaptive' && adaptiveClose,
      [text, variant, adaptiveClose],
    );

    const adaptiveIconMenu = useMemo(
      () => !text && variant === 'adaptive' && adaptiveMenu,
      [text, variant, adaptiveMenu],
    );

    const buttonIconElementSingle = useMemo(
      () =>
        (Boolean(!text) && Boolean(variant)) ||
        (Boolean(!text) && Boolean(darkThemePreset)),
      [text, variant, darkThemePreset],
    );

    const buttonIconElementSingleNoVariant = useMemo(
      () => Boolean(!text) && !Boolean(variant) && !Boolean(darkThemePreset),
      [text, variant, darkThemePreset],
    );

    const buttonIconSmall = useMemo(() => Icon && size === 'small' && text, [
      Icon,
      size,
      text,
    ]);

    const isVariantAdd = useMemo(() => variant === 'add', [variant]);
    const isVariantAdaptiveMenu = useMemo(
      () => variant === 'adaptive' && adaptiveMenu,
      [variant, adaptiveMenu],
    );
    const isVariantAdaptiveClose = useMemo(
      () => variant === 'adaptive' && adaptiveClose,
      [variant, adaptiveClose],
    );
    const isBasicIcon = useMemo(
      () => !isVariantAdd && !isVariantAdaptiveMenu && !isVariantAdaptiveClose,
      [isVariantAdd, isVariantAdaptiveMenu, isVariantAdaptiveClose],
    );

    return (
      /* eslint-disable react/button-has-type */
      <button
        className={cn('Button', {
          [`Button--${variant}`]: Boolean(variant) && !darkThemePreset,
          [`Button--${size}`]: size && text,
          'Button--single': iconSingle,
          'Button--absolute': isLoading,
          'Button--full-width': fullWidth,
          'Button--align-center': isTextCenter,
          [`Button--${darkThemePreset}`]: buttonDarkVariant,
          'Button--add-small': size === 'small' && variant === 'add',
          'Button--remove-small': size === 'small' && variant === 'remove',
          'Button--main-small': size === 'small' && variant === 'main',
          'Button--accent-small': size === 'small' && variant === 'accent',
          'Button--interface-small':
            size === 'small' && variant === 'interface',
          'Button--disabled': disabled,
          'Button--icon-no-variant-big': iconNoVariantBig,
          'Button--icon-no-variant-small': iconNoVariantSmall,
          'Button--adaptive-icon-close': adaptiveIconClose,
          'Button--adaptive-icon-menu': adaptiveIconMenu,
          'Button--icon-text-big': text && Icon && size === 'big',
          'Button--icon-text-small': text && Icon && size === 'small',
        })}
        data-name="Button"
        disabled={disabled}
        onClick={handleButtonClick}
        type={type}
        /* eslint-enable react/button-has-type */
      >
        {Icon && (
          <span
            className={cn('Button__icon', {
              'Button__icon--single': buttonIconElementSingle,
              'Button__icon--single-no-variant': buttonIconElementSingleNoVariant,
              'Button__icon--small': buttonIconSmall,
              'Button__icon--single-adaptive': !text && variant === 'adaptive',
            })}
          >
            {isVariantAdd && (
              <BasicPlusIcon colorType="richGreyColor" size="S" />
            )}
            {isVariantAdaptiveMenu && <BasicMenuIcon colorType="whiteColor" />}
            {isVariantAdaptiveClose && (
              <BasicClearIcon colorType="whiteColor" />
            )}
            {isBasicIcon && <Icon />}
          </span>
        )}
        <span
          className={cn('Button__text', {
            'Button__text--white': variant === 'main' || variant === 'accent',
            'Button__text--dark': variant === 'interface' || variant === 'add',
            'Button__text--interface-menu': variant === 'interface-menu',
            'Button__text--accent-menu': variant === 'accent-menu',
            'Button__text--success': variant === 'success',
            'Button__text--negative': textNegative || variant === 'remove',
            'Button__text--neutral': textNeutral,
            'Button__text--positive': textPositive,
            'Button__text--adaptive': variant === 'adaptive',
            'Button__text--uppercase': textUpperCase,
            'Button__text--loading-remove':
              isLoading && withLoader && variant === 'remove',
          })}
        >
          {text}
        </span>
        {withLoader && needPreloader && (
          <Overlay
            absolute
            inherit
            opened={Boolean(isLoading)}
            timeout={BUTTON_OVERLAY_TIMEOUT}
            withBorderRadius
          >
            <Preloader color={preloaderColorCheck} size="small" />
          </Overlay>
        )}
      </button>
    );
  },
);
