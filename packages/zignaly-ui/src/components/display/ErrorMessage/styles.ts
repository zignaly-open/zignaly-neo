// Dependencies
import styled from "styled-components";
import Typography from "../Typography";

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled.img`
  margin-right: 8px;
`;

type TextProps = {
  variant: string;
  as: string;
};

export const Text = styled(Typography)<TextProps>`
  color: #cc3993;
`;
