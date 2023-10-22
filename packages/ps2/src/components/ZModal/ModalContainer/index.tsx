import React, { forwardRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  BackIconButton,
  Body,
  CloseIconButton,
  Header,
  Inline,
  Layout,
  Title,
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
  const buttonSize = xs && mobileFullScreen ? '22px' : '32px';

  return (
    <Layout
      width={width}
      mobileFullScreen={mobileFullScreen}
      ref={ref}
      tabIndex={-1}
    >
      {onGoBack && typeof onGoBack === 'function' && (
        <BackIconButton onClick={onGoBack}>
          <ZigBackIcon
            width={buttonSize}
            height={buttonSize}
            color={theme.palette.neutral100}
            id={'modal__back'}
          />
        </BackIconButton>
      )}
      <Header compact={!title && !onGoBack}>
        <Inline align={titleAlign}>
          {!!title && (
            <Title
              variant={mobileFullScreen && xs ? 'h2' : 'h1'}
              mb={0}
              mt={mobileFullScreen && xs ? 'h2' : 'h1' ? -2 : undefined}
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
            width={buttonSize}
            height={buttonSize}
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
