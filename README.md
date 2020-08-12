# @wildberries/notifications

## Sollution for notifications, connected with redux

## Examples of usage

### Installation

```javascript
npm install @mihanizm56/notifications
```

### Connect to your root reducer

```javascript
import {notificationsState} from '@wildberries/notifications';

export const rootReducer = {
  notificationsState,
  ...other root reducers
};
```

### Insert the Notifications component into your project

```javascript
import React, { memo } from "react";
import { Notifications, setModalAction } from "@wildberries/notifications";
import { createPortal } from 'react-dom';
import { uniqueId } from 'lodash-es'

const portalElement = document.getElementById('portal');

class Portal extends React.PureComponent{
  constructor(props) {
    super(props);

    this.containerEl = document.createElement('div');
    this.containerEl.id = `${props.prefix}_${uniqueId('id_')}`;
    portalElement.appendChild(this.containerEl);
  }

  componentWillUnmount() {
    this.containerEl.remove();
  }

  render() {
    return createPortal(this.props.children, this.containerEl);
  }
}

const TestComponent = memo(() => (
    <div className="TestComponent">
    <Portal prefix="notifications">
      <Notifications />
    </Portal>
    </div>
  );
})
```

### Dispatch setModalAction to add notifications modal

#### SetModalAction params:
 - status - `success | error` - modal status (required)
 - text - `string` - modal test (required)
 - additionalPayload - `string` - payload of additional action if need to call from modal (not required)
 - additionalActionType - `any` - type of additional action if need to call from modal (not required)

```javascript
import React from "react";
import { setModalAction } from "@wildberries/notifications";
import { uniqueId } from 'lodash-es'
import { useDispatch } from "react-redux";

function ExampleComponent) {
  const dispatch = useDispatch();

  const setModal = () => {
    dispatch(setModalAction({
      status: 'success',
      text: 'modal text',
      additionalPayload: { foo:'bar' }, 
      additionalActionType: 'SOME_TYPE',
    }))
  }

  return (
    <div className="ExampleComponent">
        <button onClick={setModal}>button</button>
    </div>
  );
}

export default App;
```