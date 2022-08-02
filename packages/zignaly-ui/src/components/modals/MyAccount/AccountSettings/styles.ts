import styled from "styled-components";

export const ButtonContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
`;
