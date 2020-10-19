import React, { memo, ReactNode, RefObject, useMemo } from 'react';
import classNames from 'classnames/bind';
import { BasicClearIcon } from '@/components/kit-components/icons/basic-clear-icon';
import { Text } from '@/components/kit-components/text';
import { ButtonLink } from '@/components/kit-components/button-link';
import {
  ActionsConfigType,
  SizeType,
  TitleSizeType,
  VariantType,
} from '../../_types';
import { MODAL_VARIANT } from '../../_constants';
import styles from './index.module.scss';

const cn = classNames.bind(styles);

type Props = {
  /** объекты с props для кнопок модального окна */
  actionsConfig?: ActionsConfigType;
  /** содержимое модального окна */
  children?: ReactNode;
  /** флаг наличия иконки закрытия */
  isShowCloseIcon?: boolean;
  /** объект для получения ref компонента */
  modalRef: RefObject<HTMLDivElement>;
  /** флаг убирающий внутреннии отступы */
  noPadding?: boolean;
  /** колбэк закрытия срабатывает при клике на иконку закрытия */
  onClose?: () => void;
  /** ширина модального окна */
  size: SizeType;
  /** заголовок модального окна */
  title?: string;
  /** размер заголовка */
  titleSize: TitleSizeType;
  /** вариант размещения на экране */
  variant?: VariantType;
  /** флаг темной темы */
  isDarkTheme?: boolean;
};
export const ModalView = memo(
  ({
    actionsConfig: { actionButton, cancelButton } = {},
    children,
    isShowCloseIcon,
    modalRef,
    noPadding,
    onClose,
    size,
    title,
    titleSize,
    variant,
    isDarkTheme,
  }: Props) => {
    const hasActions = useMemo(() => Boolean(actionButton || cancelButton), [
      actionButton,
      cancelButton,
    ]);
    const isBottomVariant = useMemo(() => variant === MODAL_VARIANT.BOTTOM, [
      variant,
    ]);

    return (
      <div
        ref={modalRef}
        className={cn('Modal', {
          [`Modal--${size}`]: Boolean(size),
          'Modal--no-padding': noPadding,
          'Modal--with-out-overlay': isBottomVariant,
          'Modal--dark-theme': isDarkTheme,
        })}
        role="presentation"
      >
        {Boolean(title) && (
          <div className={cn('Modal__title')}>
            <Text
              color={isDarkTheme ? 'white' : 'black'}
              size={titleSize}
              text={title || ''}
            />
          </div>
        )}
        {isShowCloseIcon && !noPadding && (
          <div className={cn('Modal__close-button')}>
            <ButtonLink
              onClick={onClose}
              size="small"
              type="button"
              variant="only-icon"
            >
              {BasicClearIcon}
            </ButtonLink>
          </div>
        )}
        <div
          className={cn('Modal__content', {
            'Modal__content--no-padding': noPadding,
            'Modal__content--with-out-overlay': isBottomVariant,
          })}
        >
          {children}
        </div>
        {hasActions && !noPadding && (
          <div
            className={cn('Modal__action-buttons', {
              'Modal__action-buttons--with-out-overlay': isBottomVariant,
            })}
          >
            {actionButton && (
              <div className={cn('Modal__button')}>
                <ButtonLink
                  disabled={actionButton.disabled}
                  isDarkTheme={isDarkTheme}
                  isLoading={actionButton.isLoading}
                  onClick={actionButton.onClick}
                  size={actionButton.size || 'big'}
                  text={actionButton.title}
                  type={actionButton.type || 'button'}
                  variant={actionButton.variant || 'accent'}
                />
              </div>
            )}
            {cancelButton && (
              <div className={cn('Modal__button', 'Modal__button--last')}>
                <ButtonLink
                  disabled={cancelButton.disabled}
                  isDarkTheme={isDarkTheme}
                  isLoading={cancelButton.isLoading}
                  onClick={cancelButton.onClick}
                  size={cancelButton.size || 'big'}
                  text={cancelButton.title}
                  type={cancelButton.type || 'button'}
                  variant={cancelButton.variant || 'interface'}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
