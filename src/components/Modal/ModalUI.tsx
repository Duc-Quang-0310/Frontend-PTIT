import Modal, { ModalProps as AntdModalProps } from 'antd/lib/modal/Modal';
import ButtonUI from 'components/Button/ButtonUI';
import {
  FC,
  useMemo,
  memo,
  useCallback,
  ReactNode,
  useEffect,
  useId
} from 'react';
import './ModalUI.style.css';
import cn from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import { renderColorByType } from 'helpers/color';
import { ColorPalette } from 'constants/style.constant';
import {
  CloseIconContainer,
  CloseVisibleOnlyContainer,
  ModalContentDefaultContainer,
  ModalFooterDefaultContainer,
  ModalHeaderDefaultContainer
} from './ModalUI.style';

interface ModalProps extends AntdModalProps {
  modalTitle: ReactNode;
  onProceed?: () => void;
  onCancel?: () => void;
  content?: ReactNode;
  modalType?: 'normal' | 'confirmAction';
  modalColorType?: 'info' | 'success' | 'warning' | 'purple';
  abortEsc?: boolean;
  confirmText?: string;
  notDisplayTitle?: boolean;
  disableConfirm?: boolean;
}

const ModalUI: FC<ModalProps> = (props) => {
  const {
    footer,
    onProceed,
    onCancel,
    wrapClassName,
    modalTitle,
    content,
    modalType = 'normal',
    modalColorType = 'success',
    abortEsc = false,
    confirmText,
    notDisplayTitle = false,
    disableConfirm = false,
    ...other
  } = props;

  const uniqueKey = useId();

  const cancelAction = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const footerMemo = useMemo(() => {
    if (footer) {
      return footer;
    }

    if (modalType === 'confirmAction') {
      return (
        <ModalFooterDefaultContainer>
          <ButtonUI
            content="Xác nhận"
            colorFill={ColorPalette.red_6}
            onClick={() => onProceed?.()}
            disableConfirm={disableConfirm}
          />
        </ModalFooterDefaultContainer>
      );
    }

    return (
      <ModalFooterDefaultContainer>
        <ButtonUI
          content="Đóng"
          type="default"
          onClick={() => cancelAction()}
        />
        <ButtonUI
          content={confirmText || 'Xác nhận'}
          colorFill={renderColorByType(modalColorType)}
          onClick={() => onProceed?.()}
          disableConfirm={disableConfirm}
        />
      </ModalFooterDefaultContainer>
    );
  }, [
    footer,
    modalType,
    confirmText,
    modalColorType,
    disableConfirm,
    onProceed,
    cancelAction
  ]);

  const headerMemo = useMemo(
    () =>
      notDisplayTitle ? (
        <CloseVisibleOnlyContainer onClick={cancelAction}>
          <CloseOutlined />
        </CloseVisibleOnlyContainer>
      ) : (
        <ModalHeaderDefaultContainer
          itemType={modalType === 'confirmAction' ? 'warning' : modalColorType}
        >
          {modalTitle}
          {!abortEsc && modalType === 'normal' && (
            <CloseIconContainer onClick={cancelAction}>
              <CloseOutlined />
            </CloseIconContainer>
          )}
        </ModalHeaderDefaultContainer>
      ),
    [
      notDisplayTitle,
      modalType,
      modalColorType,
      modalTitle,
      abortEsc,
      cancelAction
    ]
  );

  const contentMemo = useMemo(() => {
    if (modalType === 'confirmAction') {
      return 'Hành động bạn sắp sửa làm sẽ không thể hoàn tác lại, bạn chắc chắn với quyết định của mình chứ?';
    }

    return content;
  }, [content, modalType]);

  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        cancelAction();
      }
    };
    document.addEventListener('keydown', handleClose, false);
    return () => {
      document.removeEventListener('keydown', handleClose, false);
    };
  }, [cancelAction]);

  return (
    <Modal
      {...other}
      key={uniqueKey}
      footer={footerMemo}
      title=""
      closable={false}
      bodyStyle={{ padding: 0 }}
      keyboard={false}
      wrapClassName={cn(wrapClassName, 'default-wrapper')}
      destroyOnClose
    >
      {headerMemo}
      <ModalContentDefaultContainer>{contentMemo}</ModalContentDefaultContainer>
    </Modal>
  );
};

export default memo(ModalUI);
