import React from 'react';
import { createAppStore } from '@wildberries/redux-core-modules';
import { Button, Text } from '@wildberries/ui-kit';
import { useDispatch, Provider } from 'react-redux';
import { text, select } from '@storybook/addon-knobs';
import { ConfirmModal } from '@/components';
import { setConfirmModalAction, closeConfirmModalAction } from '@/redux-module';

export default {
  title: 'Confirm Modal',
  component: ConfirmModal,
};

const store = createAppStore({});

const SomeYourContentComponent = () => (
  <div style={{ margin: '100px' }}>
    <Text text="SomeYourContentComponent" size="h3" color="black" />
  </div>
);

const SetModalComponent = ({
  title,
  size,
  confirmButtonText,
  cancelButtonText,
}: any) => {
  const dispatch = useDispatch();

  const setModal = () =>
    dispatch(
      setConfirmModalAction({
        title,
        size,
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
          setSuccessActionsArray: [],
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
    <SetModalComponent
      title={text('Confirm modal title', 'Confirm modal title')}
      size={select('size option', ['xs', 's', 'm', 'l', 'xl'], 'm')}
      titleSize={select('title size option', ['h1', 'h2'], 'h1')}
      confirmButtonText={text('Confirm action button text', 'Подтвердить')}
      cancelButtonText={text('Cancel modal title', 'Отменить')}
    />
  </Provider>
);
