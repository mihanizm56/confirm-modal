import {
  BaseAction,
  Action,
  ConfirmModalStateType,
  ConfirmModalActionParamsType,
} from '@/types';

export const SET_CONFIRM_MODAL = '@confirm-modal/OPEN_CONFIRM_MODAL';
export const setConfirmModalAction: Action<
  ConfirmModalStateType
> = payload => ({
  type: SET_CONFIRM_MODAL,
  payload,
});

export const CONFIRM_START_ACTION_SAGA =
  '@confirm-modal/CONFIRM_START_ACTION_SAGA';
export const confirmModalStartActionSaga: Action<
  ConfirmModalActionParamsType
> = payload => ({
  type: CONFIRM_START_ACTION_SAGA,
  payload,
});

export const CLOSE_CONFIRM_MODAL = '@confirm-modal/CLOSE_CONFIRM_MODAL';
export const closeConfirmModalAction: BaseAction = () => ({
  type: CLOSE_CONFIRM_MODAL,
});

export const CONFIRM_MODAL_LOADING_START =
  '@confirm-modal/CONFIRM_MODAL_LOADING_START';
export const confirmModalLoadingStartAction: BaseAction = () => ({
  type: CONFIRM_MODAL_LOADING_START,
});

export const CONFIRM_MODAL_LOADING_STOP =
  '@confirm-modal/CONFIRM_MODAL_LOADING_STOP';
export const confirmModalLoadingStopAction: BaseAction = () => ({
  type: CONFIRM_MODAL_LOADING_STOP,
});
