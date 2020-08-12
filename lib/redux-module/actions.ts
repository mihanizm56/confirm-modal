import { BaseAction, Action, ConfirmModalStateType } from '@/types/types';

export const SET_CONFIRM_MODAL = '@notifications/OPEN_CONFIRM_MODAL';
export const setConfirmModalAction: Action<
  ConfirmModalStateType
> = payload => ({
  type: SET_CONFIRM_MODAL,
  payload,
});

export const CLOSE_CONFIRM_MODAL = '@notifications/CLOSE_CONFIRM_MODAL';
export const closeConfirmModalAction: BaseAction = () => ({
  type: CLOSE_CONFIRM_MODAL,
});

export const CONFIRM_MODAL_LOADING_START =
  '@notifications/CONFIRM_MODAL_LOADING_START';
export const confirmModalLoadingStart: BaseAction = () => ({
  type: CONFIRM_MODAL_LOADING_START,
});

export const CONFIRM_MODAL_LOADING_STOP =
  '@notifications/CONFIRM_MODAL_LOADING_STOP';
export const confirmModalLoadingStop: BaseAction = () => ({
  type: CONFIRM_MODAL_LOADING_STOP,
});
