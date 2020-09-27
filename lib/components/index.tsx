import React, { Component } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from '@wildberries/ui-kit';
import {
  getConfirmModalParams,
  getIsConfirmModalOpened,
  getConfirmActionParams,
  getConfirmModalIsLoading,
  closeConfirmModalAction,
  confirmModalActionCreator,
} from '@/redux-module';
import {
  BaseAction,
  ActionsConfigType,
  ConfirmModalActionParamsType,
  ConfirmModalStateType,
} from '@/types/types';

type PropsType = {
  isConfirmModalOpened: boolean;
  confirmModalParams: ConfirmModalStateType;
  closeConfirmModal: BaseAction;
  dispatch: Dispatch;
  confirmActionParams?: ConfirmModalActionParamsType;
  isConfirmModalLoading: boolean;
};

export class WrappedContainer extends Component<PropsType> {
  confirmModal = () => {
    const { confirmActionParams, dispatch } = this.props;

    if (confirmActionParams) {
      confirmModalActionCreator({
        dispatch,
        actionParams: confirmActionParams,
      });
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

const mapStateToProps = (state: any) => ({
  isConfirmModalOpened: getIsConfirmModalOpened(state),
  confirmModalParams: getConfirmModalParams(state),
  confirmActionParams: getConfirmActionParams(state),
  isConfirmModalLoading: getConfirmModalIsLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      closeConfirmModal: closeConfirmModalAction,
      dispatch,
    },
    dispatch,
  );

export const ConfirmModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedContainer);
