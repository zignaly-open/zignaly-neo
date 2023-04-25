import React from 'react';
import { Modal as MuiModal } from '@mui/material';
import { LoaderContainer } from './styles';
import { Loader } from '@zignaly-open/ui';
import ModalContainer from './ModalContainer';
import { ZModalProps } from './types';
import AuthenticatedWall from '../../util/walls/AuthenticatedWall';
import {
  useIsAuthenticated,
  useMaybeMakeSureSessionIsAlive,
} from '../../apis/user/use';

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
  const isAuthenticated = useIsAuthenticated();
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
        {isLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : authOnly && !isAuthenticated ? (
          <AuthenticatedWall />
        ) : (
          <>{children}</>
        )}
      </ModalContainer>
    </MuiModal>
  );
};

export default ZModal;
