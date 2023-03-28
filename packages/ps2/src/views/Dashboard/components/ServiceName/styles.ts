import { styled } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

export const Icon = styled('div')`
  margin-right: 20px;
  width: 55px;
  height: 55px;
`;

export const StyledVerifiedIcon = styled(VerifiedIcon)`
  fill: ${(props) => props.theme.palette.greenGraph} !important;
  color: ${(props) => props.theme.palette.avatarBack} !important;
  width: 16px !important;
  height: 16px !important;
  vertical-align: sub;
  margin-left: 3px;
  display: inline-block;
`;
