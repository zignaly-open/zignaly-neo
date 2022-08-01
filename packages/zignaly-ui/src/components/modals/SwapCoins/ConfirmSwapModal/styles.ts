import styled from "styled-components";

export const Line = styled.div`
  background: #4a4958;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  width: 100%;
  height: 1px;
`;
export const IconContainer = styled.div<{ marginRight: number }>`
  margin-right: ${(props) => `${props.marginRight}`}px;
  width: 36px;
  height: 36px;
`;
