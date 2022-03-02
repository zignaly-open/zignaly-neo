// Dependencies
import styled from "styled-components";
import { Button } from "components/styled";

export const Layout = styled(Button)<React.ComponentProps<typeof Button>>`
  background: rgba(12, 13, 33, 0.8);
  border: 1px dashed #4a4958;
  border-radius: 4px;
  color: #fff;

  &:hover {
    background: rgba(17, 19, 45, 0.8);
  }
`;

export const Icon = styled.img`
  margin-right: 12px;
`;

export const Caption = styled.span`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
`;
