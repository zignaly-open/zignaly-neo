import React, { forwardRef } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Layout, Header, Title, Body, Inline, CloseIconButton } from './styles';
import { ZigBackIcon, ZigCrossCircleIcon } from '@zignaly-open/ui';
import { ModalContainerProps } from './types';

const ModalContainer = forwardRef((props: ModalContainerProps, ref) => {
  const {
    children,
    title = null,
    titleAlign = 'center',
    onGoBack = null,
    width,
    onClickClose = null,
  } = props;
  const theme = useTheme();

  return (
    <Layout width={width} ref={ref} tabIndex={-1}>
      <Header compact={!title && !onGoBack}>
        {onGoBack && typeof onGoBack === 'function' && (
          <IconButton onClick={onGoBack}>
            <ZigBackIcon
              width={'24px'}
              height={'24px'}
              color={theme.palette.neutral300}
              id={'modal__back'}
            />
          </IconButton>
        )}
        <Inline align={titleAlign}>
          {!!title && (
            <Title variant='h1' mb={0} color='neutral100' id={'modal__title'}>
              {title}
            </Title>
          )}
        </Inline>
      </Header>
      {onClickClose && typeof onClickClose === 'function' && (
        <CloseIconButton onClick={onClickClose}>
          <ZigCrossCircleIcon
            width={'32px'}
            height={'32px'}
            color={theme.palette.neutral100}
            id={'modal__close'}
          />
        </CloseIconButton>
      )}
      <Body>{children}</Body>
    </Layout>
  );
});

export default ModalContainer;
