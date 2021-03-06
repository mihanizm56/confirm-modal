import { createSelector } from 'reselect';
import { IConfirmModalStoragePart, IConfirmModalStorage } from '@/_types';
import { CONFIRM_MODALS_REDUCER_NAME } from './constants';
import { initialState } from './reducer';

export const modalStorageSelector = (store: IConfirmModalStoragePart) =>
  store[CONFIRM_MODALS_REDUCER_NAME] || initialState;

export const getIsConfirmModalOpened = createSelector(
  [modalStorageSelector],
  ({ isModalOpened }: IConfirmModalStorage) => isModalOpened,
);

export const getConfirmModalParams = createSelector(
  [modalStorageSelector],
  ({ modalParams }: IConfirmModalStorage) => modalParams,
);

export const getConfirmActionParams = createSelector(
  [modalStorageSelector],
  ({ modalParams }: IConfirmModalStorage) => modalParams.confirmActionParams,
);

export const getConfirmModalIsLoading = createSelector(
  [modalStorageSelector],
  ({ isConfirmModalLoading }: IConfirmModalStorage) => isConfirmModalLoading,
);
