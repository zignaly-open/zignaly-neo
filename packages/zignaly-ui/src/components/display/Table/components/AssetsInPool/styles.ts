import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  text-align: start;
`;

export const Column = styled.div`
  display: grid;
  justify-content: center;
`;

export const Icon = styled.div`
  margin-left: 8px;
  width: 24px;
  height: 24px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
