import { ButtonVariant } from '@/_types';

type ParamsType = {
  variant: ButtonVariant;
  isDarkTheme?: boolean;
};

export const getPreloaderColor = ({ variant, isDarkTheme }: ParamsType) => {
  if (variant) {
    if (variant === 'accent') {
      return isDarkTheme ? 'rich-grey' : 'white';
    }
    if (variant === 'main') {
      return isDarkTheme ? 'light-green' : 'white';
    }
    if (variant === 'interface') {
      return isDarkTheme ? 'white' : 'rich-grey';
    }
    if (variant === 'remove') {
      return 'red';
    }
  }
  return 'grey';
};
