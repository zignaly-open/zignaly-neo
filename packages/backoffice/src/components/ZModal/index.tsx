import React from 'react';
import { Modal as MuiModal } from '@mui/material';
import { LoaderContainer } from './styles';
import { Loader, ZigModalContainer } from '@zignaly-open/ui';
import { ZModalProps } from './types';

// TODO: move to zignaly-ui
const ZModal: React.FC<ZModalProps> = ({
  close,
  isLoading,
  disableBackdropClose,
  children,
  onGoBack,
  title,
  width,
  wide,
  titleAlign,
  ...props
}): React.ReactElement => {
  return (
    <MuiModal
      {...props}
      onClose={(event, reason) => {
        if (disableBackdropClose && reason === 'backdropClick') {
          return;
        }
        close();
      }}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <ZigModalContainer
        width={(wide && 620) || width}
        title={title}
        onClickClose={close}
        onGoBack={onGoBack}
        titleAlign={titleAlign}
      >
        {isLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <>{children}</>
        )}
      </ZigModalContainer>
    </MuiModal>
  );
};

export default ZModal;
