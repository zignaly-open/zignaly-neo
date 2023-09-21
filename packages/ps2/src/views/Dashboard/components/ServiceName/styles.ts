import { styled } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ZigTypography } from '@zignaly-open/ui';

export const Icon = styled('div')`
  margin-right: 20px;
  display: flex;
  align-items: center;
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
export const TruncatedServiceName = styled(ZigTypography)<{
  truncate: boolean;
}>`
  ${({ truncate }) =>
    truncate
      ? `
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis; 
    word-break: break-word;
  `
      : `white-space: normal;`}
`;
