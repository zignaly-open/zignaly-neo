/* eslint-disable multiline-ternary */
import Typography from "components/display/Typography";
import styled from "styled-components";

export const TotalValue = styled(Typography)``;

export const Profit = styled(Typography)``;

export const EditButton = styled.div``;

export const Layout = styled(Typography)<{ isPositive: boolean; isEqual: boolean }>`
  text-align: center;
  display: grid;
  gap: 8px;

  ${({ isEqual, theme, isPositive }) => `
    ${Profit} {
        color: ${
          isEqual
            ? theme["neutral300"]
            : isPositive
            ? theme["greenGraph"]
            : theme["redGraphOrError"]
        };
    }
  `}
`;
