import { createSelector } from 'reselect';
import { IConfirmModalStoragePart, INotificationsStorage } from '@/types/types';
import { CONFIRM_MODALS_REDUCER_NAME } from './constants';
import { initialState } from './reducer';

const modalStorageSelector = (store: IConfirmModalStoragePart) =>
  store[CONFIRM_MODALS_REDUCER_NAME] || initialState;

export const getIsConfirmModalOpened = createSelector(
  [modalStorageSelector],
  ({ isModalOpened }: INotificationsStorage) => isModalOpened,
);

export const getConfirmModalParams = createSelector(
  [modalStorageSelector],
  ({ modalParams }: INotificationsStorage) => modalParams,
);

export const getConfirmActionParams = createSelector(
  [modalStorageSelector],
  ({ modalParams }: INotificationsStorage) => modalParams.confirmActionParams,
);

export const getConfirmModalIsLoading = createSelector(
  [modalStorageSelector],
  ({ isConfirmModalLoading }: INotificationsStorage) => isConfirmModalLoading,
);
