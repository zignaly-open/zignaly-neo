import React, { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import {
  Bar,
  Dot,
  DotContainer,
  Label,
  Layout,
  Line,
  DotLabel,
  TextContainer,
  Header,
} from "./styles";
import { SliderInputProps, SliderModes } from "./types";
import { useUpdateEffect } from "react-use";
import ZigTypography from "../../display/ZigTypography";

// this slider was copied from the old code and I do not feel like debugging why values other than 0 and 100 don't work
const min = 0;
const max = 100;

// TODO: rename to ZigSliderInout, add storiea
const SliderInput = ({
  value,
  onChange = () => null,
  style,
  mode = "normal",
  labels = {
    top: null,
    left: null,
    right: null,
  },
}: SliderInputProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState<number>(
    value ? ((value - min) / (max - min)) * 100 : 0,
  );
  const [enabled, setEnabled] = useState<boolean>(false);

  /**
   * @function updateSliderCoords():
   * @description Update the coordinates of the slider based by MouseEvent.
   * @param ev MouseEvent Handler.
   */
  const updateSliderCoords = (ev: MouseEvent) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    const minPosition = 0;
    const maxPosition = rect?.width;

    if (enabled) {
      let position = 0;
      let absolutePosition = value;
      if (rect != null && maxPosition != null) {
        position = ev.clientX - rect.x;
        if (position < minPosition) {
          absolutePosition = min;
        } else if (position > maxPosition) {
          absolutePosition = max;
        } else {
          absolutePosition = Math.round((position / maxPosition) * (max - min) + min);
        }
        absolutePosition = Math.round(absolutePosition * (1 / 5)) / (1 / 5);
        setInternalValue(absolutePosition);
      }
    }
  };

  const releaseSlider = () => setEnabled(false);

  useEffect(() => {
    window.addEventListener("mousemove", updateSliderCoords);
    window.addEventListener("mouseup", releaseSlider);

    return () => {
      window.removeEventListener("mousemove", updateSliderCoords);
      window.removeEventListener("mouseup", releaseSlider);
    };
  }, [enabled]);

  useUpdateEffect(() => {
    onChange(internalValue);
  }, [internalValue]);

  const isRangeMode = useMemo(() => mode === SliderModes.range, []);

  return (
    <>
      {labels.top && (
        <Header>
          <ZigTypography variant="body1" color={"neutral200"}>
            {labels.top}
          </ZigTypography>
        </Header>
      )}
      <Layout style={style}>
        <TextContainer>
          {!!labels.left && (
            <Label variant="body2" fontWeight="demibold" color="neutral200">
              {labels.left}
            </Label>
          )}
          <Label
            className={"value"}
            variant="body2"
            fontWeight="demibold"
            color={labels.left ? "highlighted" : "neutral200"}
          >
            {isRangeMode ? 100 - value : 0}%
          </Label>
        </TextContainer>
        <Bar ref={sliderRef}>
          <Line variant="left" />
          <Line variant="middle" />
          <Line variant="right" />
          <DotContainer onMouseDown={() => setEnabled(true)} value={value}>
            <Dot>
              {!isRangeMode && (
                <DotLabel variant={"body2"} color={"highlighted"}>
                  {value}%
                </DotLabel>
              )}
            </Dot>
          </DotContainer>
        </Bar>
        <TextContainer>
          {labels.right && (
            <Label variant="body2" fontWeight="demibold" color="neutral200">
              {labels.right}
            </Label>
          )}
          <Label
            variant="body2"
            fontWeight="demibold"
            className={"value"}
            color={labels.right ? "highlighted" : "neutral200"}
          >
            {isRangeMode ? value : 100}%
          </Label>
        </TextContainer>
      </Layout>
    </>
  );
};

export default SliderInput;
