import { styled } from '@mui/material';
import { MarginContainer } from '@zignaly-open/ui';

export const PageWithHeaderContainer = styled(MarginContainer)<{
  hasHeader?: boolean;
}>`
  padding: ${(props) => (props.isOwner !== false ? 108 : 50)}px 22px 0 !important;
`;
