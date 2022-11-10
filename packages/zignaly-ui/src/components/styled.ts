import styled from "styled-components";
import Typography from "./display/Typography";

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
`;

// TODO: replace with proper styled comp usages instead of classes
export const ValueIndicator = styled(Typography)<any>`
  display: inline;
  font-size: 15px !important;
  line-height: 24px !important;
  font-weight: 500;

  ${(props: any) => `
    
    &.zero {
      color: ${props.theme.neutral300}
    }
    
    &.positive {
      color: ${props.theme.greenGraph};
    }
    
    &.negative {
      color: ${props.theme.redGraphOrError};
    }
  `}
`;
