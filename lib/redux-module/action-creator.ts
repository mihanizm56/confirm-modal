import { Dispatch } from 'redux';
import { batchActions } from 'redux-batched-actions';
import {  setModalAction} from '@wildberries/notifications';
import { ConfirmModalActionParamsType } from '@/types/types';
import {  confirmModalLoadingStart, confirmModalLoadingStop } from './actions';

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
    notificationSuccessText,
    notificationErrorText,
    showNotificationError,
    showNotificationSuccess,
    resetInitialFormValuesAction,
  },
}: ParamsType) => {
  dispatch(confirmModalLoadingStart())

  if (resetInitialFormValuesAction) {
    dispatch(resetInitialFormValuesAction(requestParams));
  }

  const formattedRequestParams = requestParamsFormatter
    ? requestParamsFormatter(requestParams)
    : requestParams;

  try {
    const responseData = await request(formattedRequestParams);

    if (responseData.error) {
      // serialize data to be catched to the "catch" block and to be parsed
      throw new Error(
        JSON.stringify({
          errorText: responseData.errorText,
          additionalErrors: responseData.additionalErrors,
        }),
      );
    }

    // format data
    const formattedResponseData = responseDataFormatter
      ? responseDataFormatter(responseData.data)
      : responseData.data;
      

    // dispatch success actions
    if (setSuccessAction) {
      dispatch(setSuccessAction(formattedResponseData));
    } else if (setSuccessActionsArray && setSuccessActionsArray.length) {
      const preparedActions = setSuccessActionsArray.map(action=>action(formattedResponseData))

      dispatch(batchActions(preparedActions));
    }    

    // trigger success notification
    if (showNotificationSuccess && notificationSuccessText) {
      
      dispatch(
        setModalAction({
          status: 'success',
          text:notificationSuccessText,
        }),
      );
    }
  } catch (error) {
        // deserialize data from the "catch" block to be parsed
        const errorData = JSON.parse(error.message);
        // get additionalErrors from rest and json-rpc requests
        // eslint-disable-next-line
        const additionalErrors = errorData.additionalErrors?.errors ?? errorData?.additionalErrors

    // dispatch fail actions
    if (setErrorAction) {
     dispatch(setErrorAction(errorData.errorText));
    } else if (setErrorActionsArray && setErrorActionsArray.length) {      // eslint-disable-next-line
      // @ts-ignore
      dispatch(batchActions(setErrorActionsArray.map(action=>action(errorData))))
    }

    // trigger failed notification
    if(showNotificationError){
      dispatch(
        setModalAction({
          status: 'error',
          text: notificationErrorText || errorData.errorText,
        }),
      );
    }
  } finally{
    dispatch(confirmModalLoadingStop())
  }
};
