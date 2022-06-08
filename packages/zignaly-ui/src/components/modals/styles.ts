// Dependencies
import styled from "styled-components";

export const Actions = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 22px;
  grid-column-gap: 22px;
  grid-template-columns: repeat(${(props: any) => props.columns}, minmax(0%, 100%));
  margin-top: 26px;
`;
