import styled from "styled-components";


export const SelectorContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-top: 20px;
  gap: 1px;
`;

export const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
