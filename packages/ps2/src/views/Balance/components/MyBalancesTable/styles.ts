import { Box, styled } from '@mui/material';

export const ButtonsWrapper = styled(Box)`
  display: flex;
  position: fixed;
  bottom: 56px;
  height: 60px;
  width: 100%;
  padding: 10px 3px 5px 3px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  // background-color: ${({ theme }) => theme.palette.backgrounds.modal};
  background-color: #060819;
`;
