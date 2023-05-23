import React, { forwardRef } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Layout, Header, Title, Body, Inline } from './styles';
import { ZigArrowLeftIcon, ZigCrossCircleIcon } from '@zignaly-open/ui';
import { ModalContainerProps } from './types';

const ModalContainer = forwardRef((props: ModalContainerProps, ref) => {
  const {
    children,
    title = null,
    titleAlign = 'center',
    onGoBack = null,
    width,
    onClickClose = null,
    customHeaderAction = null,
  } = props;
  const theme = useTheme();

  return (
    <Layout width={width} ref={ref}>
      <Header compact={!title && !onGoBack}>
        {onGoBack && typeof onGoBack === 'function' && (
          <IconButton onClick={onGoBack}>
            <ZigArrowLeftIcon
              width={'24px'}
              height={'24px'}
              color={theme.palette.neutral300}
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
        {!customHeaderAction
          ? onClickClose &&
            typeof onClickClose === 'function' && (
              <IconButton onClick={onClickClose}>
                <ZigCrossCircleIcon
                  width={'24px'}
                  height={'24px'}
                  color={theme.palette.neutral300}
                />
              </IconButton>
            )
          : customHeaderAction}
      </Header>
      <Body>{children}</Body>
    </Layout>
  );
});

export default ModalContainer;
