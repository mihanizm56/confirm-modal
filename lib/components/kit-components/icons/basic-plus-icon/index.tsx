import { KitIcon } from '../_utils/kit-icon';
import { IconHOC } from '../_utils/icon-hoc';

const PATH = ['M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z'];

export const BasicPlusIcon = IconHOC({
  paths: PATH,
  viewBox: '-2 -2 24 24',
})(KitIcon);
