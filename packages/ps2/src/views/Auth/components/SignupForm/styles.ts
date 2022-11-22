import { ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/material';

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 22px;
  width: 100%;
`;

export const Action = styled('div')`
  display: inline-flex;
  flex-direction: column;
  gap: 22px;
  margin: 26px 0;
  align-items: center;
  justify-content: center;
`;

export const TitleHead = styled('div')`
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const StyledErrorOutline = styled(ErrorOutline)`
  color: ${({ theme }) => theme.palette.neutral300};
  margin-right: 8px;
`;
