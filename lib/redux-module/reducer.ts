import { IConfirmModalStorage } from '@/types';
import {
  SET_CONFIRM_MODAL,
  CLOSE_CONFIRM_MODAL,
  CONFIRM_MODAL_LOADING_START,
  CONFIRM_MODAL_LOADING_STOP,
} from './actions';

export const initialState: IConfirmModalStorage = {
  isModalOpened: false,
  modalParams: {
    confirmButtonProps: {
      text: '',
    },
    cancelButtonProps: {
      text: '',
    },
    title: '',
    size: 'm',
  },
  isConfirmModalLoading: false,
};

export const confirmModalModuleReducer = (
  state: IConfirmModalStorage = initialState,
  { type, payload }: any,
) => {
  switch (type) {
    case SET_CONFIRM_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalParams: payload,
      };

    case CLOSE_CONFIRM_MODAL:
      return {
        ...state,
        isModalOpened: false,
      };

    case CONFIRM_MODAL_LOADING_START:
      return {
        ...state,
        isConfirmModalLoading: true,
      };
    case CONFIRM_MODAL_LOADING_STOP:
      return {
        ...state,
        isConfirmModalLoading: false,
      };

    default:
      return state;
  }
};
