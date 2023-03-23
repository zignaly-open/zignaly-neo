import React from 'react';
import { Modal as MuiModal } from '@mui/material';
import { LoaderContainer } from './styles';
import { Loader } from '@zignaly-open/ui';
import ModalContainer from './ModalContainer';
import { ZModalProps } from './types';
import AuthenticatedWall from '../../util/walls/AuthenticatedWall';
import { useMaybeMakeSureSessionIsAlive } from '../../apis/user/use';

// TODO: move to zignaly-ui
const ZModal: React.FC<ZModalProps> = ({
  close,
  isLoading,
  authOnly,
  children,
  onGoBack,
  title,
  width,
  wide,
  titleAlign,
  ...props
}): React.ReactElement => {
  useMaybeMakeSureSessionIsAlive(!!authOnly);
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
        width={(wide && 784) || width}
        title={title}
        onClickClose={close}
        onGoBack={onGoBack}
        titleAlign={titleAlign}
      >
        {authOnly && <AuthenticatedWall />}
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
