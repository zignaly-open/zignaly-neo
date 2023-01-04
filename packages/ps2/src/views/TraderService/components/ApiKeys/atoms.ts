import { Box, styled } from '@mui/system';

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

export const TextWrapperRow = styled(Box)``;
