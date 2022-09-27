import styled from "styled-components";
import { styledIf } from "utils/styled";

export const Actions = styled.div<{ align?: string }>`
  display: flex;
  width: 100%;
  gap: 22px;
  margin-top: 56px;
  justify-content: ${({ align }) => align || "center"};
`;

export const AmountContainer = styled.div<{
  width: string;
  coloredBorder?: boolean;
  height: string;
  borderRadius: number;
}>`
  position: relative;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #101225;
  box-shadow: inset 0px 0px 0px 1px #35334a;
  border-radius: 5px;
  box-sizing: border-box;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    padding: 2px;
    background: none;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  ${(props) => `
    width: ${props.width}px;
    height: ${props.height}px;
    border-radius: ${props.borderRadius}px;

    &:before{
      border-radius:${props.borderRadius}px;
    }


    ${styledIf(
      props.coloredBorder,
      `
        &:before {
        background: linear-gradient(#8671F7, #7EC9F9);
      }`,
    )}
    `}
`;
