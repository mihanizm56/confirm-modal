import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from '@wildberries/ui-kit';
import {
  getConfirmModalParams,
  getIsConfirmModalOpened,
  getConfirmActionParams,
  getConfirmModalIsLoading,
  closeConfirmModalAction,
  confirmModalStartActionSaga,
} from '@/redux-module';
import {
  Action,
  BaseAction,
  ActionsConfigType,
  ConfirmModalActionParamsType,
  ConfirmModalStateType,
} from '@/types';

type MapStateReturnType = {
  isConfirmModalOpened: boolean;
  confirmModalParams: ConfirmModalStateType;
  confirmActionParams?: ConfirmModalActionParamsType;
  isConfirmModalLoading: boolean;
};

type MapDispatchReturnType = {
  closeConfirmModal: BaseAction;
  confirmModalStart: Action<ConfirmModalActionParamsType>;
};

type PropsType = {} & MapStateReturnType & MapDispatchReturnType;

export class WrappedContainer extends Component<PropsType> {
  confirmModal = () => {
    const { confirmActionParams } = this.props;

    if (confirmActionParams) {
      this.props.confirmModalStart(confirmActionParams);
    }
  };

  getModalConfrmPropsConfig = (): ActionsConfigType => ({
    actionButton: {
      onClick: this.confirmModal,
      // eslint-disable-next-line
      // @ts-ignore
      type: 'button',
      withLoader: true,
      isLoading: this.props.isConfirmModalLoading,
      size: 'big',
      title: this.props.confirmModalParams.confirmButtonProps.text,
      variant: 'main',
    },
    cancelButton: {
      onClick: this.props.closeConfirmModal,
      // eslint-disable-next-line
      // @ts-ignore
      type: 'button',
      withLoader: true,
      isLoading: false,
      size: 'big',
      title: this.props.confirmModalParams.cancelButtonProps.text,
      variant: 'interface',
    },
  });

  render() {
    const {
      confirmModalParams: { content, title, size = 'm', titleSize = 'h1' },
      closeConfirmModal,
      isConfirmModalOpened,
    } = this.props;

    return (
      <Modal
        // eslint-disable-next-line
        // @ts-ignore
        actionsConfig={this.getModalConfrmPropsConfig()}
        isShowCloseIcon
        isOpened={isConfirmModalOpened}
        onClose={closeConfirmModal}
        title={title}
        titleSize={titleSize}
        size={size}
      >
        {content}
      </Modal>
    );
  }
}

const mapStateToProps = (state: any): MapStateReturnType => ({
  isConfirmModalOpened: getIsConfirmModalOpened(state),
  confirmModalParams: getConfirmModalParams(state),
  confirmActionParams: getConfirmActionParams(state),
  isConfirmModalLoading: getConfirmModalIsLoading(state),
});

const mapDispatchToProps: MapDispatchReturnType = {
  closeConfirmModal: closeConfirmModalAction,
  confirmModalStart: confirmModalStartActionSaga,
};

export const ConfirmModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedContainer);
