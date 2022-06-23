// Dependencies
import styled from "styled-components";

export const Actions = styled.div<{ align?: string }>`
  display: flex;
  width: 100%;
  gap: 22px;
  margin-top: 26px;
  justify-content: ${({ align }) => align || "center"};
`;
