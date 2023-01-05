import { Box, styled } from '@mui/system';
import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';

export const ApiKeysContainer = styled(Box)`
  gap: 24px;
`;

export const TitleBox = styled(Box)`
  padding-bottom: 32px;
  margin-bottom: 32px;
  margin-top: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.neutral700};
`;

export const ApiKey = styled(Box)`
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.neutral700};
  &:last-child {
    border-bottom-width: 0;
  }
`;

export const TextWrapperRow = styled(Box)`
  margin-top: 6px;
`;

export const MultilineLabel: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <Box sx={{ flexDirection: 'column', display: 'flex' }}>
      <ZigTypography>{title}</ZigTypography>
      <ZigTypography color='neutral400' variant={'caption'}>
        {subtitle}
      </ZigTypography>
    </Box>
  );
};
