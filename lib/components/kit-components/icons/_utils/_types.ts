import { COLOR_TYPES, ICON_SIZES } from './_constants';

export type GetIconType = {
  paths: Array<string>;
  viewBox: string;
};

export type IconPropType = {
  colorType?: keyof typeof COLOR_TYPES;
  size?: keyof typeof ICON_SIZES;
};
