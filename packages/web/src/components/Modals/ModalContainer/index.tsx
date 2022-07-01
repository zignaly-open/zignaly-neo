// Dependencies
import React, { useMemo } from 'react';

// Styled Components
import { Layout, Header, Title, Body, HeaderButton, Inline } from './styles';

// Assets
import { CloseIcon } from 'zignaly-ui';
import { ArrowLeftIcon } from 'zignaly-ui';

// Types
import { ModalContainerProps } from './types';

function ModalContainer({
  children,
  title = null,
  width = 800,
  onGoBack = null,
  onClickClose = null,
  centerHeaderText = false,
  customHeaderAction = null,
}: ModalContainerProps) {
  const renderHeaderAction = useMemo(
    () =>
      !customHeaderAction
        ? onClickClose &&
          typeof onClickClose === 'function' && (
            <HeaderButton onClick={onClickClose}>
              <CloseIcon />
            </HeaderButton>
          )
        : customHeaderAction,
    [customHeaderAction],
  );

  return (
    <Layout width={width}>
      <Header width={width}>
        {centerHeaderText ? (
          <>
            <Inline>
              {onGoBack && typeof onGoBack === 'function' && (
                <HeaderButton onClick={onGoBack}>
                  <ArrowLeftIcon />
                </HeaderButton>
              )}
            </Inline>
            <Title variant='h1' color='neutral100' weight={'medium'}>
              {title}
            </Title>
          </>
        ) : (
          <Inline>
            {onGoBack && typeof onGoBack === 'function' && (
              <HeaderButton onClick={onGoBack}>
                <ArrowLeftIcon />
              </HeaderButton>
            )}
            <Title variant='h1' color='neutral100' weight={'medium'}>
              {title}
            </Title>
          </Inline>
        )}
        {renderHeaderAction}
      </Header>
      <Body width={width}>{children}</Body>
    </Layout>
  );
}

export default ModalContainer;
