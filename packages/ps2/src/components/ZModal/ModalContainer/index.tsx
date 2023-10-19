import React, { forwardRef, useMemo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  Layout,
  Header,
  Title,
  Body,
  Inline,
  CloseIconButton,
  BackIconButton,
} from './styles';
import { ZigBackIcon, ZigCrossIcon } from '@zignaly-open/ui';
import { ModalContainerProps } from './types';

const ModalContainer = forwardRef((props: ModalContainerProps, ref) => {
  const {
    children,
    title = null,
    titleAlign = 'center',
    onGoBack = null,
    width,
    onClickClose = null,
    titleStyles,
    mobileFullScreen,
  } = props;
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('sm'));

  const clickBack = useMemo(
    () => onGoBack || (xs && mobileFullScreen && onClickClose) || null,
    [onGoBack, onClickClose, mobileFullScreen, xs],
  );

  return (
    <Layout
      width={width}
      mobileFullScreen={mobileFullScreen}
      ref={ref}
      tabIndex={-1}
    >
      {clickBack && typeof clickBack === 'function' && (
        <BackIconButton onClick={clickBack}>
          <ZigBackIcon
            width={'32px'}
            height={'32px'}
            color={theme.palette.neutral100}
            id={'modal__back'}
          />
        </BackIconButton>
      )}
      <Header compact={!title && !clickBack}>
        <Inline align={titleAlign}>
          {!!title && (
            <Title
              variant='h1'
              mb={0}
              color='neutral100'
              id={'modal__title'}
              sx={titleStyles}
            >
              {title}
            </Title>
          )}
        </Inline>
      </Header>
      {onClickClose && typeof onClickClose === 'function' && (
        <CloseIconButton onClick={onClickClose}>
          <ZigCrossIcon
            width={'32px'}
            height={'32px'}
            color={theme.palette.neutral100}
            id={'modal__close'}
          />
        </CloseIconButton>
      )}
      <Body mobileFullScreen={mobileFullScreen}>{children}</Body>
    </Layout>
  );
});

export default ModalContainer;
