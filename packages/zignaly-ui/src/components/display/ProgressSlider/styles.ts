import croma from "chroma-js";
import styled from "styled-components";
import Typography from "../Typography";

export const Layout = styled.div`
  position: relative;
  padding-top: 10px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Bar = styled.div`
  background: linear-gradient(90deg, #567734 0%, #948d23 34.43%, #8e3b24 68.81%, #8c1954 99.89%);
  box-shadow: inset 0px 1px 1px -1px rgba(73, 9, 123, 0.25);
  border-radius: 100px;
  height: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 7px;
`;

export const DotContainer = styled.div<{ value: number }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: ${(props) => props.value}%;
  top: -4px;
  transform: translate(-50%, 0%);
`;

export const Dot = styled.div`
  background: rgba(255, 255, 255, 0.9);
  height: 7px;
  margin-top: 3px;
  width: 2px;
`;

export const Label = styled(Typography)`
  color: RGB(193, 193, 200);

  &.body1 {
    font-size: 13px;
  }
`;

const gradient = croma.scale(["#567734", "#948d23", "#8e3b24", "#8c1954"]);

export const LabelTooltip = styled(Label)<{ value: number }>`
  border-radius: 3px;
  pointer-events: none;
  background: ${(props) =>
    gradient(props.value / 100)
      .brighten(1)
      .toString()};

  top: -38px;
  line-height: 1 !important;
  padding: 5px 6px;
  position: relative;
  display: block;
  color: ${(props) =>
    gradient(props.value / 100)
      .darken(1.5)
      .toString()};

  &:before {
    content: "";
    border: 4px solid transparent;
    border-top-color: ${(props) =>
      gradient(props.value / 100)
        .brighten(1)
        .toString()};
    position: absolute;
    top: 100%;
    left: calc(50% - 4px);
  }

  small {
    font-size: 10px;
    bottom: 2px;
    position: relative;
  }
`;
