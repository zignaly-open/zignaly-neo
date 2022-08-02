import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 82%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Layout = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LiquidateButton = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 18px;
  height: 36px;
  width: 112px;
  background: rgba(16, 18, 37, 0.3);
  border: 1px solid #cc3993;
  border-radius: 5px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  width: 18%;
`;
