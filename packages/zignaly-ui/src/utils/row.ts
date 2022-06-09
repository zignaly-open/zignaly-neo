import styled from "styled-components";

export const Row = styled.div<{ gap?: number; justifyContent?: "center" | "end" | "start" }>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.gap}px;
  justify-content: ${(props) => props.justifyContent};
`;
