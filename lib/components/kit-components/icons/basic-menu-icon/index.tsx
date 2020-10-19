import { KitIcon } from '../_utils/kit-icon';
import { IconHOC } from '../_utils/icon-hoc';

const PATH = ['M20 2V0H0V2H20ZM20 6V8H0V6H20ZM20 12V14H0V12H20Z'];

export const BasicMenuIcon = IconHOC({
  paths: PATH,
  viewBox: '-2 -5 24 24',
})(KitIcon);
