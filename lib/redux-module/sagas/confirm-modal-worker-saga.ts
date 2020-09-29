import { put, call } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { setModalAction } from '@wildberries/notifications';
import { ConfirmModalActionParamsType } from '@/types';
import {
  confirmModalLoadingStartAction,
  confirmModalLoadingStopAction,
  closeConfirmModalAction,
} from '../actions';

export function* confirmModalWorkerSaga({
  request,
  requestParams,
  requestParamsFormatter,
  responseDataFormatter,
  setErrorAction,
  setErrorActionsArray,
  setSuccessAction,
  setSuccessActionsArray,
  notificationSuccessConfig,
  notificationErrorConfig,
  showNotificationError,
  showNotificationSuccess,
  resetInitialFormValuesAction,
  notCloseAfterSuccessRequest,
  notStopLoadingAfterSuccessRequest,
}: ConfirmModalActionParamsType) {
  yield put(confirmModalLoadingStartAction());

  if (resetInitialFormValuesAction) {
    resetInitialFormValuesAction(requestParams);
  }

  const formattedRequestParams = requestParamsFormatter
    ? requestParamsFormatter(requestParams)
    : requestParams;

  try {
    const { data, error, errorText } = yield call(
      request,
      formattedRequestParams,
    );

    if (error) {
      // serialize data to be catched to the "catch" block and to be parsed
      throw new Error(errorText);
    }

    // format data
    const formattedResponseData = responseDataFormatter
      ? responseDataFormatter(data)
      : data;

    // dispatch success actions
    if (setSuccessAction) {
      yield put(setSuccessAction(formattedResponseData));
    } else if (setSuccessActionsArray) {
      const preparedActions = setSuccessActionsArray.map(action =>
        action(formattedResponseData),
      );

      yield put(batchActions(preparedActions));
    }

    if (!notCloseAfterSuccessRequest) {
      yield put(closeConfirmModalAction());
    }

    // trigger success notification
    if (showNotificationSuccess && notificationSuccessConfig) {
      yield put(
        setModalAction({
          status: 'success',
          text: notificationSuccessConfig.text,
          title: notificationSuccessConfig.title,
        }),
      );
    }

    if (!notStopLoadingAfterSuccessRequest) {
      yield put(confirmModalLoadingStopAction());
    }
  } catch (error) {
    // deserialize data from the "catch" block to be parsed
    const errorText = error.message;
    console.error('(confirm-modal) catch error ', errorText);

    // dispatch fail actions
    if (setErrorAction) {
      yield put(setErrorAction(errorText));
    } else if (setErrorActionsArray && setErrorActionsArray.length) {
      yield put(
        batchActions(setErrorActionsArray.map(action => action(errorText))),
      );
    }

    // trigger failed notification
    if (showNotificationError) {
      yield put(
        setModalAction({
          status: 'error',
          text:
            notificationErrorConfig && notificationErrorConfig.text
              ? notificationErrorConfig.text
              : '',
          title:
            notificationErrorConfig && notificationErrorConfig.title
              ? notificationErrorConfig.title
              : errorText,
        }),
      );
    }

    yield put(confirmModalLoadingStopAction());
  }
}
