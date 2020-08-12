import {
  ButtonVariant,
  ButtonSize,
} from '@wildberries/ui-kit/lib/button/types';
import { CONFIRM_MODALS_REDUCER_NAME } from '@/redux-module/constants';

export type IMakeExternalActionParams = {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
};

export interface INotificationsStorage {
  isModalOpened: boolean;
  modalParams: ConfirmModalStateType;
  isConfirmModalLoading: boolean;
}

export interface IConfirmModalStoragePart {
  [CONFIRM_MODALS_REDUCER_NAME]: INotificationsStorage;
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
  request: (params: any) => Promise<any>;
  requestParams: any;
  setErrorAction?: AnyAction;
  setErrorActionsArray?: Array<AnyAction>;
  setSuccessAction?: AnyAction;
  setSuccessActionsArray?: Array<AnyAction>;
  notificationParams: {
    successNotificatonParams?: {
      text: string;
    };
    errorNotificatonParams?: {
      text: string;
    };
  };
  responseDataFormatter?: (data: any) => any;
  withoutFormattingError?: boolean;
  resetInitialFormValuesAction?: AnyAction;
};

export type ConfirmModalStateType = {
  title: string;
  content?: any;
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