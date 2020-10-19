import { setModalAction } from '@wildberries/notifications';
import { CONFIRM_MODALS_REDUCER_NAME } from '@/redux-module/constants';

export type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl';

export type TitleSizeType = 'h1' | 'h2';

export type IMakeExternalActionParams = {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
};

export type ButtonSize = 'big' | 'small';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface IConfirmModalStorage {
  isModalOpened: boolean;
  modalParams: ConfirmModalStateType;
  isConfirmModalLoading: boolean;
}

export interface IConfirmModalStoragePart {
  [CONFIRM_MODALS_REDUCER_NAME]: IConfirmModalStorage;
}

export type BaseAction = () => {
  type: string;
};
export type Action<T> = (
  payload: T,
) => {
  type: string;
  payload: T;
};

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

export type BaseButtonType = {
  title: string;
  type?: BaseButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  withLoader?: boolean;
};
export type ActionButtonType = BaseButtonType & {
  onClick: () => void;
};
export type ActionsConfigType = {
  actionButton?: ActionButtonType;
  cancelButton?: ActionButtonType;
};

export type ConfirmModalActionParamsType = {
  requestParamsFormatter?: (data: any) => any;
  request: (params?: any) => Promise<any>;
  requestParams?: any;
  setErrorAction?: AnyAction;
  setErrorActionsArray?: Array<AnyAction>;
  setSuccessAction?: AnyAction;
  setSuccessActionsArray?: Array<AnyAction>;
  responseDataFormatter?: (data: any) => any;
  resetInitialFormValuesAction?: AnyAction;
  showNotificationError?: boolean;
  showNotificationSuccess?: boolean;
  notCloseAfterSuccessRequest?: boolean;
  notStopLoadingAfterSuccessRequest?: boolean;
  notificationSuccessConfig?: {
    text?: string;
    title?: string;
  };
  notificationErrorConfig?: {
    text?: string;
    title?: string;
  };
  setModalAction?: typeof setModalAction;
};

export type ConfirmModalStateType = {
  title?: string;
  content?: any;
  size?: SizeType;
  titleSize?: TitleSizeType;
  confirmActionParams?: ConfirmModalActionParamsType;
  confirmButtonProps: {
    text: string;
  };
  cancelButtonProps: {
    text: string;
    action?: AnyAction;
  };
};

export type AnyAction = (payload?: any) => { type: string; payload?: any };

export type AnchorPropsType = {
  href: string;
  target?: string;
};
export type ButtonPropsType = {
  disabled?: boolean;
  type?: string;
};

export type TagOptionalPropsType = AnchorPropsType | ButtonPropsType;
