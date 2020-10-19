import React, { FC, memo } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';
import { SizeType, ColorType } from './_types';

const cn = classnames.bind(styles);

type PreloaderPropsType = {
  /** type of color preloader */
  color: ColorType;
  /** type of size preloader */
  size: SizeType;
};

export const Preloader: FC<PreloaderPropsType> = memo(
  ({ size, color }: PreloaderPropsType) => (
    <div className={cn('Preloader')} data-name="Preloader">
      <div
        className={cn('Preloader__circular', {
          [`Preloader__circular--${size}`]: Boolean(size),
          [`Preloader__circular--${color}`]: Boolean(color),
        })}
      />
    </div>
  ),
);
