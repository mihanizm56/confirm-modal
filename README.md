# @wildberries/confirm-modal-portal

## Sollution for confirm modals, connected with redux

## Examples of usage

### Installation

```javascript
npm install @wildberries/confirm-modal-portal
```

### Connect to your root reducer

```javascript
import {
  CONFIRM_MODALS_REDUCER_NAME,
  confirmModalModuleReducer,
} from '@wildberries/confirm-modal-portal';

export const rootReducer = {
  [CONFIRM_MODALS_REDUCER_NAME]: confirmModalModuleReducer,
};
```

### Insert the ConfirmModal component into your project

```javascript
import React, { memo } from "react";
import { ConfirmModal } from '@wildberries/confirm-modal-portal';

const TestComponent = memo(() => (
    <ConfirmModal />
  )
)
```

### Dispatch setConfirmModalAction to add confirm modal

#### SetModalAction params:
  - title - title of the modal
  - content - modal content (React component)
  - size - modal ui-kit size
  - confirmActionParams - params of modal confirmation process (see below)
  - confirmButtonProps - params of confirm button
  - cancelButtonProps- params of cancel button

#### ConfirmActionParams params:
  - requestParamsFormatter - formatter before equest data will be sent
  - request - the request that needs to be confirmed
  - requestParams - params that will be set to the request
  - setErrorAction - the action that will be dispatched when error from the request comes
  - setErrorActionsArray - the array of actions that will be dispatched when error from the request comes
  - setSuccessAction - the action that will be dispatched when success from the request comes
  - setSuccessActionsArray - the array of actions that will be dispatched when success from the request comes
  - notificationSuccessConfig - the text config for the successful notification
  - notificationErrorConfig - the text config for the error notification
  - responseDataFormatter - formatter of the data that goes to the success action (or an array of actions)
  - resetInitialFormValuesAction - resetting form values (RFF needs if connected to the redux)
  - showNotificationError - flag to show error notification when error from the request comes
  - showNotificationSuccess - flag to show success notification when success from the request comes

```javascript
import React from "react";
import {
  setConfirmModalAction,
  ConfirmModalStateType,
  closeConfirmModalAction,
} from '@wildberries/confirm-modal-portal';
import { useDispatch } from "react-redux";

function ExampleComponent() {
  const dispatch = useDispatch();

  const openConfirmModal = () => {
    dispatch(
      this.props.setConfirmModalAction({
        content: <SomeYourContentComponent />,
        confirmActionParams: {
          request: deleteUserFromSupplierRequest,
          requestParams: { foo: 'bar' },
          setSuccessActionsArray: [
            this.props.closeConfirmModal,
            () =>
              this.props.deleteSupplierUser({
                supplierId,
                userId,
              }),
          ],
          notificationSuccessConfig: {title:'Пользователь был удалён'},
          showNotificationError: true,
          showNotificationSuccess: true,
        },
        confirmButtonProps: {
          text: 'Удалить',
        },
        cancelButtonProps: {
          text: 'Отмена',
        },
      })
  }

  return (
    <div className="ExampleComponent">
        <button onClick={openConfirmModal}>button</button>
    </div>
  );
}

export default ExampleComponent;
```