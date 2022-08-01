// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";
import Typography from "../Typography";

export const Layout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 22px;
`;

export const Bar = styled.div<{ ref: any; margin?: number }>`
  background: #222249;
  box-shadow: inset 0 1px 1px -1px rgba(73, 9, 123, 0.25);
  border: 1px solid #413ba0;
  border-radius: 100px;
  height: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 ${(props) => props.margin}px;
`;

export const PercentContainer = styled.div<{ value: number }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: ${(props) => props.value}%;
  bottom: 20px;
  transform: translate(-50%, 0%);
`;

export const DotContainer = styled.div<{ value: number }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: ${(props) => props.value}%;
  top: -4px;
  transform: translate(-50%, 0%);
`;

export const Line = styled.div<{ variant: "left" | "middle" | "right" }>`
  border-left: 1px solid #acb6ff;
  height: 6px;
  position: absolute;
  ${(props) => `
    ${styledIf(
      props.variant === "left",
      `
      left: 25%;
      right: 75%;
      top: 52.38%;
      bottom: 47.62%;
    `,
    )}
  ${styledIf(
    props.variant === "middle",
    `
    left: 50%;
    right: 75%;
    top: 52.38%;
    bottom: 47.62%;
    `,
  )}
  ${styledIf(
    props.variant === "right",
    `
    left: 75%;
    right: 75%;
    top: 52.38%;
    bottom: 47.62%; 
    `,
  )}
`}
`;

export const Dot = styled.div`
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  width: 20px;
  height: 20px;
`;

export const Label = styled(Typography)``;

export const TextContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  margin-bottom: 12px;
`;
