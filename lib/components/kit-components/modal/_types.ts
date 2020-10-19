import { ButtonSize, ButtonType, ButtonVariant } from '@/_types';

export type BaseButtonType = {
  title: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
};

export type ActionButtonType = BaseButtonType & {
  onClick: () => void;
};

export type ActionsConfigType = {
  actionButton?: ActionButtonType;
  cancelButton?: ActionButtonType;
};

export type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl';

export type TitleSizeType = 'h1' | 'h2';

export type VariantType = 'bottom' | 'center';

export type ModalVariantType = {
  BOTTOM: 'bottom';
  CENTER: 'center';
};
