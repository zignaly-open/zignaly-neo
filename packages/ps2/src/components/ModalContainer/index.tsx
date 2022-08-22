import React from 'react';
import { useTheme } from 'styled-components';
import { Layout, Header, Title, Body, HeaderButton, Inline } from './styles';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { CloseIcon, ArrowLeftIcon } from '@zignaly-open/ui';
import { ModalContainerProps } from './types';

function ModalContainer({
  children,
  title = null,
  titleAlign = 'left',
  onGoBack = null,
  onClickClose = null,
  customHeaderAction = null,
}: ModalContainerProps) {
  const theme = useTheme() as Theme;

  return (
    <Layout>
      <Header>
        <Inline align={titleAlign}>
          {onGoBack && typeof onGoBack === 'function' && (
            <HeaderButton onClick={onGoBack}>
              <ArrowLeftIcon
                width={'32px'}
                height={'32px'}
                color={theme.neutral300}
              />
            </HeaderButton>
          )}
          <Title>{title}</Title>
        </Inline>
        {!customHeaderAction
          ? onClickClose &&
            typeof onClickClose === 'function' && (
              <HeaderButton onClick={onClickClose}>
                <CloseIcon color={theme.neutral300} />
              </HeaderButton>
            )
          : customHeaderAction}
      </Header>
      <Body>{children}</Body>
    </Layout>
  );
}

export default ModalContainer;
