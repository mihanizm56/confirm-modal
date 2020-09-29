import { take, fork } from 'redux-saga/effects';
import { ConfirmModalActionParamsType } from '@/types';
import { CONFIRM_START_ACTION_SAGA } from '../actions';
import { confirmModalWorkerSaga } from './confirm-modal-worker-saga';

export const CONFIRM_MODAL_SAGA_NAME = 'CONFIRM_MODAL_SAGA_NAME';
export function* confirmModalWatcherSaga() {
  while (true) {
    const { payload }: { payload: ConfirmModalActionParamsType } = yield take(
      CONFIRM_START_ACTION_SAGA,
    );
    yield fork(confirmModalWorkerSaga, payload);
  }
}
