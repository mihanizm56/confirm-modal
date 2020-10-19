import React from 'react';
import { createAppStore } from '@wildberries/redux-core-modules';
import { useDispatch, Provider } from 'react-redux';
import { text, select, boolean } from '@storybook/addon-knobs';
import { Notifications, setModalAction } from '@wildberries/notifications';
import { ConfirmModal } from '@/components';
import {
  setConfirmModalAction,
  confirmModalWatcherSaga,
  CONFIRM_MODAL_SAGA_NAME,
} from '@/redux-module';
import { Text } from '@/components/kit-components/text';
import { Button } from '@/components/kit-components/button';

export default {
  title: 'Confirm Modal',
  component: ConfirmModal,
};

const store = createAppStore({
  rootSagas: {
    [CONFIRM_MODAL_SAGA_NAME]: confirmModalWatcherSaga,
  },
});

const SomeYourContentComponent = () => (
  <div style={{ margin: '0' }}>
    <Text text="SomeYourContentComponent" size="h3" color="black" />
  </div>
);

const SetModalComponent = ({
  title,
  size,
  confirmButtonText,
  cancelButtonText,
  notCloseAfterSuccessRequest,
  notStopLoadingAfterSuccessRequest,
}: any) => {
  const dispatch = useDispatch();

  const setModal = () =>
    dispatch(
      setConfirmModalAction({
        title,
        size,
        content: <SomeYourContentComponent />,
        confirmActionParams: {
          setModalAction,
          notCloseAfterSuccessRequest,
          notStopLoadingAfterSuccessRequest,
          request: () =>
            new Promise(res => {
              // eslint-disable-next-line
              console.log('CHECK REQUEST');

              setTimeout(() => {
                res({
                  error: false,
                  errorText: '',
                  adiditionalErrors: null,
                  data: {},
                });
              }, 2000);
            }),
          requestParams: { foo: 'bar' },
          // setSuccessAction: () => ({ type: 'TEST ACTION' }),
          setSuccessActionsArray: [
            () => ({ type: 'TEST ACTION_1' }),
            () => ({ type: 'TEST ACTION_2' }),
            () => ({ type: 'TEST ACTION_3' }),
          ],
          notificationSuccessConfig: { title: 'Пользователь был удалён' },
          showNotificationError: true,
          showNotificationSuccess: true,
        },
        confirmButtonProps: {
          text: confirmButtonText,
        },
        cancelButtonProps: {
          text: cancelButtonText,
        },
      }),
    );

  return (
    <div style={{ paddingBottom: '30px' }}>
      <div>
        <Button text="Set confirm modal" type="button" onClick={setModal} />
      </div>
    </div>
  );
};

export const ModalsInAction = () => (
  <Provider store={store}>
    <ConfirmModal />
    <Notifications />
    <SetModalComponent
      title={text('Confirm modal title', 'Confirm modal title')}
      size={select('size option', ['xs', 's', 'm', 'l', 'xl'], 'm')}
      titleSize={select('title size option', ['h1', 'h2'], 'h1')}
      confirmButtonText={text('Confirm action button text', 'Подтвердить')}
      cancelButtonText={text('Cancel modal title', 'Отменить')}
      notCloseAfterSuccessRequest={boolean(
        'Not to close modal after succeed request',
        false,
      )}
      notStopLoadingAfterSuccessRequest={boolean(
        'Not to stop loading modal after succeed request',
        false,
      )}
    />
  </Provider>
);
