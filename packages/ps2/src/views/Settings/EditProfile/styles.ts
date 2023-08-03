import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ProfileStatusBoxContainer = styled(Box)<{ isSuccess: boolean }>`
  border: 1px solid
    ${({ isSuccess, theme }) => theme.palette[isSuccess ? 'greenGraph' : 'red']};
  background: ${({ isSuccess, theme }) =>
    theme.palette[isSuccess ? 'greenGraph' : 'red']}1a;
  padding: 15px 36px;
  margin-top: 15px;
  border-radius: 7px;
  text-align: center;
`;
