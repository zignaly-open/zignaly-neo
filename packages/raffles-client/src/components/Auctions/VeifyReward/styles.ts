import { Box } from '@mui/material';
import { Typography } from '@zignaly-open/ui';
import styled from '@emotion/styled';

export const TypographyTitle = styled(Typography)`
  margin-bottom: 6px !important;
`;

export const TypographyStep = styled(Typography)``;

export const Layout = styled(Box)`
  max-width: 1280px;
`;

export const Form = styled.form``;

export const Gap = styled.div<{ gap: number }>`
  ${(props) => `
  padding: ${props.gap}px;`}
`;
