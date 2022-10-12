import React from 'react';
import { Modal as MuiModal } from '@mui/material';
import { LoaderContainer } from './styles';
import { Loader } from '@zignaly-open/ui';
import ModalContainer from './ModalContainer';
import { ZModalProps } from './types';

// TODO: move to zignaly-ui
const ZModal: React.FC<ZModalProps> = ({
  close,
  isLoading,
  children,
  onGoBack,
  title,
  width = 784,
  ...props
}): React.ReactElement => {
  return (
    <MuiModal
      {...props}
      onClose={close}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <ModalContainer
        width={width}
        title={title}
        onClickClose={close}
        onGoBack={onGoBack}
      >
        {isLoading ? (
          <LoaderContainer>
            <Loader color={'#fff'} ariaLabel={'Loading...'} />
          </LoaderContainer>
        ) : (
          <>{children}</>
        )}
      </ModalContainer>
    </MuiModal>
  );
};

export default ZModal;
