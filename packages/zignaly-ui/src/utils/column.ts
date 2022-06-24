import styled from "styled-components";

export const Column = styled.div<{
  gap?: number;
  justifyContent?: "center" | "end" | "start" | "space-between";
  alignItems?: "center" | "end" | "start" | "space-between";
  textAlign?: "end" | "center" | "start";
  height?: string;
  flex?: number;
  width?: string;
}>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.flex};
  gap: ${(props) => props.gap}px;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => `${props.textAlign}`};
  height: ${(props) => `${props.height}`};
  width: ${(props) => `${props.width}`};
`;
