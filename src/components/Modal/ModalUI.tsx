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
import {
  CloseIconContainer,
  ModalContentDefaultContainer,
  ModalFooterDefaultContainer,
  ModalHeaderDefaultContainer
} from './ModalUI.style';
import './ModalUI.style.css';
import cn from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import { renderColorByType } from 'helpers/color';
import { ColorPalette } from 'constants/style.constant';

interface ModalProps extends AntdModalProps {
  modalTitle: string;
  onProceed?: () => void;
  onCancel?: () => void;
  content?: ReactNode;
  modalType?: 'normal' | 'confirmAction';
  modalColorType?: 'info' | 'success' | 'warning';
  abortEsc?: boolean;
}

const DetectEsc: FC<{ close: () => void }> = ({ close }) => {
  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        if (close) {
          close();
        }
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

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
          />
        </ModalFooterDefaultContainer>
      );
    }

    return (
      <ModalFooterDefaultContainer>
        <ButtonUI content="Đóng" type="default" onClick={() => onProceed?.()} />
        <ButtonUI
          content="Xác nhận"
          colorFill={renderColorByType(modalColorType)}
          onClick={() => cancelAction()}
        />
      </ModalFooterDefaultContainer>
    );
  }, [footer, cancelAction, modalColorType, onProceed, modalType]);

  const headerMemo = useMemo(
    () => (
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
    [modalTitle, modalType, modalColorType, abortEsc, cancelAction]
  );

  const contentMemo = useMemo(() => {
    if (modalType === 'confirmAction') {
      return 'Hành động bạn sắp sửa làm sẽ không thể hoàn tác lại, bạn chắc chắn với quyết định của mình chứ?';
    }

    return content;
  }, [content, modalType]);

  return (
    <>
      {!abortEsc && <DetectEsc close={cancelAction} />}
      <Modal
        {...other}
        key={uniqueKey}
        footer={footerMemo}
        title=""
        closable={false}
        bodyStyle={{ padding: 0 }}
        keyboard
        wrapClassName={cn(wrapClassName, 'default-wrapper')}
        destroyOnClose
      >
        {headerMemo}
        <ModalContentDefaultContainer>
          {contentMemo}
        </ModalContentDefaultContainer>
      </Modal>
    </>
  );
};

export default memo(ModalUI);
