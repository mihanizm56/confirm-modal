import { KitIcon } from '../_utils/kit-icon';
import { IconHOC } from '../_utils/icon-hoc';

const PATH = [
  'M16.4142 15L22.7782 21.364L21.364 22.7782L15 16.4143L8.63604 22.7782L7.22183 21.364L13.5858 15L7.22183 8.63608L8.63604 7.22187L15 13.5858L21.364 7.22187L22.7782 8.63608L16.4142 15Z',
];

export const BasicClearIcon = IconHOC({
  paths: PATH,
  viewBox: '3 3 24 24',
})(KitIcon);
