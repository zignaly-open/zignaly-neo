import styled from "styled-components";
import ZigTypography from "./display/ZigTypography";
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
export const ValueIndicator = styled(ZigTypography)<any>`
  display: inline;
  font-size: 15px !important;
  line-height: 24px !important;
  font-weight: 500;

  ${(props: any) => `
    
    &.zero {
      color: ${props.theme.palette.neutral300}
    }
    
    &.positive {
      color: ${props.theme.palette.greenGraph};
    }
    
    &.negative {
      color: ${props.theme.palette.redGraphOrError};
    }
  `}
`;
