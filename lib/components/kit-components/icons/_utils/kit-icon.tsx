import React, { memo } from 'react';
import { GetIconType, IconPropType } from './_types';
import { ICON_SIZES, EVENODD, COLOR_TYPES } from './_constants';

export const KitIcon = memo(
  ({
    colorType = 'richGreyColor',
    size = 'M',
    paths,
    viewBox,
  }: GetIconType & IconPropType) => (
    <svg
      fill="none"
      height={ICON_SIZES[size]}
      viewBox={viewBox}
      width={ICON_SIZES[size]}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map(path => (
        <path
          key={path}
          clipRule={EVENODD}
          d={path}
          fill={COLOR_TYPES[colorType]}
          fillRule={EVENODD}
        />
      ))}
    </svg>
  ),
);
