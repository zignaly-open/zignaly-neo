import styled from "styled-components";

export const Container = styled.div``;

export const IconContainer = styled.div<{ marginRight: number }>`
  margin-right: ${(props) => `${props.marginRight}`}px;
  width: 36px;
  height: 36px;
`;
