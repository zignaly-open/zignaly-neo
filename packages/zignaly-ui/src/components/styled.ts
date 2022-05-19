// Dependencies
import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: grid;

  ${(props: any) => `
    grid-template-columns: repeat(${props.children.length}, minmax(0%, 100%));
    gap: 8px;
  `}
`;

export const MarginContainer = styled.div`
  margin: 0 auto;
  max-width: 1430px;
  padding: 0 22px;
  width: 100%;
`;

export const PageContainer = styled(MarginContainer)`
  padding: 52px 22px 0;
  
  &.withSubHeader {
    padding-top: 110px;
  }
`;
