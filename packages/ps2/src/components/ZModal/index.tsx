import React, { useEffect } from 'react';
import { Modal as MuiModal } from '@mui/material';
import { LoaderContainer } from './styles';
import { Loader, ZigModalContainer } from '@zignaly-open/ui';
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
  disableBackdropClose,
  children,
  onGoBack,
  title,
  width,
  wide,
  titleAlign,
  titleStyles,
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
        ...(props.sx ?? {}),
      }}
    >
      <ZigModalContainer
        width={(wide && 620) || width}
        title={title}
        onClickClose={close}
        onGoBack={onGoBack}
        titleAlign={titleAlign}
        titleStyles={titleStyles}
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
      </ZigModalContainer>
    </MuiModal>
  );
};

export default ZModal;
