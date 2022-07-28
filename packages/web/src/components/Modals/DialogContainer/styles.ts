import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { CloseIcon } from 'zignaly-ui';

// TODO: we should fix types in zignaly-ui
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: fixme
export const StyledCloseIcon = styled(CloseIcon)`
  width: 15px;
  height: 15px;
  color: #65647e;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: 16px;
`;
