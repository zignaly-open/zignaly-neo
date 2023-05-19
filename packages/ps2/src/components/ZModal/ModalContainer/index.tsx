import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Layout, Header, Title, Body, Inline } from './styles';
import { ZigArrowLeftIcon } from '@zignaly-open/ui';
import { ModalContainerProps } from './types';
import { Close } from '@mui/icons-material';

function ModalContainer({
  children,
  title = null,
  titleAlign = 'center',
  onGoBack = null,
  width,
  onClickClose = null,
  customHeaderAction = null,
}: ModalContainerProps) {
  const theme = useTheme();

  return (
    <Layout width={width}>
      <Header compact={!title && !onGoBack}>
        <Inline align={titleAlign}>
          {onGoBack && typeof onGoBack === 'function' && (
            <HeaderButton onClick={onGoBack}>
              <ZigArrowLeftIcon
                width={'32px'}
                height={'32px'}
                color={theme.palette.neutral300}
              />
            </HeaderButton>
          )}
          {!!title && (
            <Title
              variant='h1'
              sx={{ paddingRight: '20px' }}
              color='neutral100'
              id={'modal__title'}
            >
              {title}
            </Title>
          )}
        </Inline>
        {!customHeaderAction
          ? onClickClose &&
            typeof onClickClose === 'function' && (
              <IconButton onClick={onClickClose}>
                <Close
                  sx={{ color: theme.palette.neutral300 }}
                  id={'modal__close'}
                  fontSize='large'
                />
              </IconButton>
            )
          : customHeaderAction}
      </Header>
      <Body>{children}</Body>
    </Layout>
  );
}

export default ModalContainer;
