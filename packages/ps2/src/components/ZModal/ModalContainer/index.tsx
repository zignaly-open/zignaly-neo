import React from 'react';
import { useTheme } from '@mui/material';
import { Layout, Header, Title, Body, HeaderButton, Inline } from './styles';
import { CloseIcon, ArrowLeftIcon } from '@zignaly-open/ui';
import { ModalContainerProps } from './types';

function ModalContainer({
  children,
  title = null,
  titleAlign = 'left',
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
              <ArrowLeftIcon
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
            >
              {title}
            </Title>
          )}
        </Inline>
        {!customHeaderAction
          ? onClickClose &&
            typeof onClickClose === 'function' && (
              <HeaderButton onClick={onClickClose}>
                <CloseIcon color={theme.palette.neutral300} />
              </HeaderButton>
            )
          : customHeaderAction}
      </Header>
      <Body>{children}</Body>
    </Layout>
  );
}

export default ModalContainer;
