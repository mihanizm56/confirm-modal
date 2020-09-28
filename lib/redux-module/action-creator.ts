import { Dispatch } from 'redux';
import { batchActions } from 'redux-batched-actions';
import { setModalAction } from '@wildberries/notifications';
import { ConfirmModalActionParamsType } from '@/types';
import {
  confirmModalLoadingStart,
  confirmModalLoadingStop,
  closeConfirmModalAction,
} from './actions';
import { getErrorData } from './utils/get-error-data';

type ParamsType = {
  dispatch: Dispatch;
  actionParams: ConfirmModalActionParamsType;
};

export const confirmModalActionCreator = async ({
  dispatch,
  actionParams: {
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
  },
}: ParamsType) => {
  dispatch(confirmModalLoadingStart());

  if (resetInitialFormValuesAction) {
    dispatch(resetInitialFormValuesAction(requestParams));
  }

  const formattedRequestParams = requestParamsFormatter
    ? requestParamsFormatter(requestParams)
    : requestParams;

  try {
    const { data, error, errorText } = await request(formattedRequestParams);

    if (error) {
      // serialize data to be catched to the "catch" block and to be parsed
      throw new Error(JSON.stringify(errorText));
    }

    // format data
    const formattedResponseData = responseDataFormatter
      ? responseDataFormatter(data)
      : data;

    // dispatch success actions
    if (setSuccessAction) {
      dispatch(setSuccessAction(formattedResponseData));
    } else if (setSuccessActionsArray) {
      const preparedActions = setSuccessActionsArray.map(action =>
        action(formattedResponseData),
      );

      dispatch(batchActions(preparedActions));
    }

    // trigger success notification
    if (showNotificationSuccess && notificationSuccessConfig) {
      dispatch(
        setModalAction({
          status: 'success',
          text: notificationSuccessConfig.text,
          title: notificationSuccessConfig.title,
        }),
      );
    }
  } catch (error) {
    // deserialize data from the "catch" block to be parsed
    const errorText = getErrorData(error);
    console.error('(confirm-modal) catch error ', errorText);

    // dispatch fail actions
    if (setErrorAction) {
      dispatch(setErrorAction(errorText));
    } else if (setErrorActionsArray && setErrorActionsArray.length) {
      dispatch(
        batchActions(setErrorActionsArray.map(action => action(errorText))),
      );
    }

    // trigger failed notification
    if (showNotificationError) {
      dispatch(
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
  } finally {
    if (!notCloseAfterSuccessRequest) {
      dispatch(
        batchActions([
          dispatch(confirmModalLoadingStop()),
          dispatch(closeConfirmModalAction()),
        ]),
      );
    }
  }
};
