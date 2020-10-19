import React, { FC, ComponentType } from 'react';
import { IconPropType, GetIconType } from './_types';

type PropsType = IconPropType & GetIconType;

export const IconHOC = ({ paths, viewBox }: GetIconType) => (
  Component: FC<PropsType> | ComponentType<PropsType>,
) => ({ colorType, size }: IconPropType) => (
  <Component
    colorType={colorType}
    paths={paths}
    size={size}
    viewBox={viewBox}
  />
);
