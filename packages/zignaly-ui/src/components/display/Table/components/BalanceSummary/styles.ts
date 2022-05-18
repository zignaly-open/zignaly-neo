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
  ${(props) => `
    ${Profit} {
        color: ${
          props.isEqual
            ? props.theme["neutral300"]
            : props.isPositive
            ? props.theme["greenGraph"]
            : props.theme["redGraphOrError"]
        };
    }
  `}
`;
