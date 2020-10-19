import React, {
  ComponentType,
  FC,
  memo,
  ReactNode,
  SyntheticEvent,
  useEffect,
} from 'react';
import classNames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';
import styles from './index.module.scss';

const cn = classNames.bind(styles);

type OverlayPropsType = {
  /** флаг меняющий свойство position с fixed на absolute */
  absolute?: boolean;
  /** содержимое компонента */
  children: FC | ComponentType | ReactNode;
  /** флаг включающий наследование backgroundColor родительского компонента */
  inherit?: boolean;
  /** прозрачность оверлея */
  opacity?: string;
  /** коллбек клика по оверлею */
  onClick?: (event: SyntheticEvent) => void;
  /** флаг открытого состояния */
  opened: boolean;
  /** время анимации показа оверлея */
  timeout?: number;
  /** флаг меняющий backgroundColor на transparent */
  transparent?: boolean;
  /** флаг меняющий backgroundColor на белый */
  whiteBackground?: boolean;
  /** скругление оверлея для кнопки */
  withBorderRadius?: boolean;
  /** флаг отключения анимации закрытия оверлея */
  isExitAnimationDisabled?: boolean;
};

const DEFAULT_TIME_TO_SHOW_OVERLAY = 500;
const DEFAULT_OPACITY_VALUE = '0.7';

export const Overlay: FC<OverlayPropsType> = memo(
  ({
    absolute,
    children,
    inherit,
    onClick = () => false,
    opacity = DEFAULT_OPACITY_VALUE,
    opened,
    timeout = DEFAULT_TIME_TO_SHOW_OVERLAY,
    transparent,
    whiteBackground,
    withBorderRadius,
    isExitAnimationDisabled,
  }: OverlayPropsType) => {
    useEffect(() => {
      document.documentElement.style.setProperty(
        '--overlay-animation-duration',
        `${timeout}ms`,
      );
      document.documentElement.style.setProperty('--overlay-opacity', opacity);
    }, [opacity, timeout]);

    return (
      <CSSTransition
        classNames={{
          enter: cn('Overlay--enter'),
          exit: cn(isExitAnimationDisabled ? '' : 'Overlay--exit'),
        }}
        data-name="Overlay"
        in={opened}
        timeout={timeout}
        unmountOnExit
      >
        <div
          className={cn('Overlay', {
            'Overlay--inherit': inherit,
            'Overlay--transparent': transparent,
            'Overlay--whiteBackground': whiteBackground,
            'Overlay--absolute': absolute,
            'Overlay--curved': withBorderRadius,
          })}
          onClick={onClick}
          role="presentation"
        >
          {children}
        </div>
      </CSSTransition>
    );
  },
);
