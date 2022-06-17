import styled from "styled-components";

export const Row = styled.div<{
  gap?: number;
  justifyContent?: "center" | "end" | "start";
  alignItems?: "center" | "end" | "start";
  textAlign?: "end" | "center" | "start" | "left";
  height?: string;
  flex?: number;
  width?: string;
  maxWidth?: string;
  marginLeft?: string;
}>`
  display: flex;
  flex-direction: row;
  flex: ${(props) => props.flex};
  gap: ${(props) => props.gap}px;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => `${props.textAlign}`};
  height: ${(props) => `${props.height}`};
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  margin-left: ${(props) => `${props.marginLeft}`}px;
`;
