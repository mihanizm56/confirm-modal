import { SyntheticEvent } from 'react';

export type ButtonClickEventType = {
  /** ивент событие */
  event: SyntheticEvent<HTMLButtonElement>;
};

export type ButtonSize = 'big' | 'small';

export type ButtonType = 'button' | 'submit' | 'reset';

export type TargetType = '_blank' | '_self' | '_parent' | '_top';

export type ButtonVariant =
  | 'main'
  | 'accent'
  | 'interface'
  | 'success'
  | 'adaptive'
  | 'interface-menu'
  | 'accent-menu'
  | 'remove'
  | 'add'
  | 'link'
  | 'only-icon'
  | 'player';

export type DarkThemePresets = 'neutral' | 'positive' | 'negative';
