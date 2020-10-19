import React, { memo, useCallback, useEffect, useRef, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';
import { Overlay } from '@/components/kit-components/overlay';
import { Portal } from '@/components/kit-components/portal';
import { KEY_CODES } from '@/constants';
import style from '@/components/kit-components/overlay/index.module.scss';
import { ModalView } from './_components/modal-view';
import { OVERLAY_TIMEOUT, MODAL_VARIANT } from './_constants';
import {
  ActionsConfigType,
  SizeType,
  TitleSizeType,
  VariantType,
} from './_types';

const cn = classNames.bind(style);

type PropsType = {
  /** объекты с props для кнопок модального окна */
  actionsConfig?: ActionsConfigType;
  /** содержимое модального окна */
  children?: ReactNode;
  /** флаг отключающий закрытие при клике по оверлею */
  disableOverlayClick?: boolean;
  /** флаг наличия иконки закрытия */
  isShowCloseIcon?: boolean;
  /** флаг открытия модального окна */
  isOpened: boolean;
  /** флаг прозрачного оверлея */
  isTransparent?: boolean;
  /** флаг убирающий внутреннии отступы */
  noPadding?: boolean;
  /** колбэк закрытия срабатывает при клике на иконку закрытия */
  onClose: () => void;
  /** заголовок модального окна */
  title?: string;
  /** размер заголовка */
  titleSize?: TitleSizeType;
  /** флаг отключения анимации закрытия оверлея */
  isExitAnimationDisabled?: boolean;
  /** ширина модального окна */
  size?: SizeType;
  /** вариант размещения на экране */
  variant?: VariantType;
  /** флаг темной темы */
  isDarkTheme?: boolean;
};

export const Modal = memo(
  ({
    actionsConfig,
    children,
    disableOverlayClick,
    isOpened,
    isTransparent,
    onClose = () => false,
    title,
    titleSize = 'h1',
    isShowCloseIcon,
    isExitAnimationDisabled,
    noPadding,
    size = 's',
    variant = MODAL_VARIANT.CENTER,
    isDarkTheme,
  }: PropsType) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = useCallback(
      ({ target }) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(target) &&
          !disableOverlayClick
        ) {
          onClose();
        }
      },
      [disableOverlayClick, onClose],
    );

    const handleDocumentKeyDown = useCallback(
      ({ keyCode }) => {
        if (keyCode === KEY_CODES.ESCAPE) {
          onClose();
        }
      },
      [onClose],
    );

    useEffect(() => {
      document.addEventListener('keydown', handleDocumentKeyDown);

      return () => {
        document.removeEventListener('keydown', handleDocumentKeyDown);
      };
    }, []); // eslint-disable-line

    return (
      <Portal data-name="Modal" prefix="modal" zIndex={90}>
        {variant === MODAL_VARIANT.CENTER && (
          <Overlay
            isExitAnimationDisabled={isExitAnimationDisabled}
            onClick={handleOverlayClick}
            opened={isOpened}
            timeout={OVERLAY_TIMEOUT}
            transparent={isTransparent}
          >
            <ModalView
              actionsConfig={actionsConfig}
              isDarkTheme={isDarkTheme}
              isShowCloseIcon={isShowCloseIcon}
              modalRef={modalRef}
              noPadding={noPadding}
              onClose={onClose}
              size={size}
              title={title}
              titleSize={titleSize}
            >
              {children}
            </ModalView>
          </Overlay>
        )}
        {variant === MODAL_VARIANT.BOTTOM && (
          <CSSTransition
            classNames={{
              enter: cn('Overlay--enter'),
              exit: cn(isExitAnimationDisabled ? '' : 'Overlay--exit'),
            }}
            data-name="Overlay"
            in={isOpened}
            timeout={OVERLAY_TIMEOUT}
            unmountOnExit
          >
            <ModalView
              actionsConfig={actionsConfig}
              isDarkTheme={isDarkTheme}
              isShowCloseIcon={isShowCloseIcon}
              modalRef={modalRef}
              noPadding={noPadding}
              onClose={onClose}
              size={size}
              title={title}
              titleSize={titleSize}
              variant={variant}
            >
              {children}
            </ModalView>
          </CSSTransition>
        )}
      </Portal>
    );
  },
);
