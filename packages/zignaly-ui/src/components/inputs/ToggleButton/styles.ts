import styled from "styled-components";
import { styledIf } from "utils/styled";

const ToggleCommonProperties = styled.div`
  transition: opacity 0.25s ease;
  display: flex;
  justify-content: center;
`;

export const ToggleCircle = styled.div`
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 10%;
  bottom: 10%;
  left: 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-sizing: border-box;
  transition: all 0.25s ease;
`;

export const ToggleInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const ToggleCheck = styled(ToggleCommonProperties)`
  opacity: 0;
  position: absolute;
  left: 20px;
  top: 20%;
  bottom: 10%;
`;

export const ToggleUncheck = styled(ToggleCommonProperties)`
  opacity: 1;
  position: absolute;
  right: 20px;
  top: 20%;
  bottom: 10%;
`;

export const ToggleContainer = styled.div`
  width: 96px;
  height: 40px;
  padding: 0;
  border-radius: 30px;
  transition: all 0.2s ease;
`;

export const Toggle = styled.div<{ checked?: boolean }>`
  touch-action: pan-x;
  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  ${(props) =>
    `
    ${ToggleContainer}
    {
      background-color: #9CA3AF;
    }
    ${styledIf(
      props.checked,
      `
    ${ToggleCheck}{
        opacity: 1;
    }
    ${ToggleContainer}
    {
        background-color: ${props.theme["greenGraph"]};
    }
   ${ToggleUncheck}{
        opacity: 0;
    }
    ${ToggleCircle}{
        left: 60px;
    }
  `,
    )}`}
`;
