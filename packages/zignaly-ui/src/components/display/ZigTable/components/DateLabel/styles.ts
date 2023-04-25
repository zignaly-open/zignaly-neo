import styled from "styled-components";
import muiStyled from "@emotion/styled";
import ZigTypography from "../../../ZigTypography";

export const Layout = styled.div``;

// https://github.com/microsoft/TypeScript/issues/48212
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Value: typeof ZigTypography = muiStyled(ZigTypography)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
