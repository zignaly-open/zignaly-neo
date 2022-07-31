import styled from "@emotion/styled";

export const Gap = styled.div<{ gap: number }>`
  ${(props) => `
  padding: ${props.gap}px;`}
`;

export const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
