import { Typography } from '@zignaly-open/ui';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const TypographyStyled = styled(Typography)<{ opacity: number }>`
  opacity: ${(props) => props.opacity};

  svg {
    height: 16px;
    position: relative;
    top: 2px;
  }
`;

export const YesNo: React.FC<{ value: boolean }> = ({ value }) => {
  const { t } = useTranslation('common');
  return (
    <TypographyStyled opacity={value ? 1 : 0.3}>
      {value ? (
        <>
          <CheckIcon /> {t('common:yes')}
        </>
      ) : (
        <>
          <CloseIcon /> {t('common:no')}
        </>
      )}
    </TypographyStyled>
  );
};
