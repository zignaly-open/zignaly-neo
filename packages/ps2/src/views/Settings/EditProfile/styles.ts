import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ProfileStatusBoxContainer = styled(Box)<{
  color: string;
}>`
  border: 1px solid ${({ color }) => color}80;
  background: ${({ color }) => color}1a;
  padding: 15px 16px;
  margin-top: 15px;
  border-radius: 7px;
  text-align: center;
`;
