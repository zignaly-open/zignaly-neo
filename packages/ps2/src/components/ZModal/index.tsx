import React, { useEffect } from 'react';
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
  allowUnauth,
  children,
  onGoBack,
  title,
  width,
  wide,
  titleAlign,
  ...props
}): React.ReactElement => {
  const isAuthenticated = useIsAuthenticated();
  useMaybeMakeSureSessionIsAlive(!allowUnauth);
  const notLoggedInWhenNeeded = !allowUnauth && !isAuthenticated;

  useEffect(() => {
    notLoggedInWhenNeeded && setTimeout(close);
  }, [notLoggedInWhenNeeded]);

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
        ) : notLoggedInWhenNeeded ? (
          <AuthenticatedWall />
        ) : (
          <>{children}</>
        )}
      </ModalContainer>
    </MuiModal>
  );
};

export default ZModal;
export { Form, ModalActions } from './ModalContainer/styles';
