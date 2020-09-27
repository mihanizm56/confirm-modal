import React from 'react';
import { createAppStore } from '@wildberries/redux-core-modules';
import { Button, Text } from '@wildberries/ui-kit';
import { useDispatch, Provider } from 'react-redux';
import { ConfirmModal } from '@/components';
import { setConfirmModalAction, closeConfirmModalAction } from '@/redux-module';

export default {
  title: 'Confirm Modal',
};

const store = createAppStore({});

const SomeYourContentComponent = () => (
  <div style={{ margin: '100px' }}>
    <Text text="SomeYourContentComponent" size="h3" color="black" />
  </div>
);

const SetModalComponent = () => {
  const dispatch = useDispatch();

  const setModal = () =>
    dispatch(
      setConfirmModalAction({
        size: 'm',
        content: <SomeYourContentComponent />,
        confirmActionParams: {
          request: () =>
            new Promise(res =>
              res({
                error: false,
                errorText: '',
                adiditionalErrors: null,
                data: {},
              }),
            ),
          requestParams: { foo: 'bar' },
          setSuccessAction: closeConfirmModalAction,
          notificationSuccessConfig: { title: 'Пользователь был удалён' },
          showNotificationError: true,
          showNotificationSuccess: true,
        },
        confirmButtonProps: {
          text: 'Удалить',
        },
        cancelButtonProps: {
          text: 'Отмена',
        },
      }),
    );

  return (
    <div style={{ paddingBottom: '30px' }}>
      <div>
        <Button text="set positive modal" type="button" onClick={setModal} />
      </div>
    </div>
  );
};

export const ModalsInAction = () => (
  <Provider store={store}>
    <ConfirmModal />
    <SetModalComponent />
  </Provider>
);
