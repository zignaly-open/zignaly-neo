import IconButton from "components/inputs/IconButton";
import styled from "styled-components";
import { styledIf } from "utils/styled";

export const PageNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 41px;
  height: 36px;
  border-radius: 5px;
  background: #101225;
  box-shadow: inset 0px 0px 0px 1px #35334a;
`;

export const Row = styled.div<{ justifyContent: "end" | "start" | "center" }>`
  display: flex;
  flex: 3;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: ${(props) => props.justifyContent};
`;

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const SelectorSizing = styled.div`
  height: 36px;
  width: 90px;
`;

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 22px;
`;

export const IconButtonContainer = styled(IconButton)<{ rotate?: boolean }>`
  ${(props) => `
  ${styledIf(
    props.rotate,
    `
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    `,
  )}
  `}
`;
