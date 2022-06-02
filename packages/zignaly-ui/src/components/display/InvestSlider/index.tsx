// Dependencies
import React, { useEffect } from "react";
import { useState } from "react";

// Styled Components
import {
  Bar,
  Dot,
  DotContainer,
  Label,
  Layout,
  Line,
  PercentContainer,
  TextContainer,
  Header,
} from "./styles";
import { InvestSliderProps, SliderTypes } from "./types";
import Typography from "../Typography";

const InvestSlider = ({
  label,
  className,
  max = 100,
  min = 0,
  style,
  initialValue = 30,
  onChange = () => {},
  type = null,
}: InvestSliderProps) => {
  const [value, setValue] = useState<number>(
    initialValue ? ((initialValue - min) / (max - min)) * 100 : 0,
  );
  const [enabled, setEnabled] = useState<boolean>(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rect = sliderRef.current?.getBoundingClientRect();
    const minPosition = 0;
    const maxPosition = rect?.width;
    window.onmousemove = (ev: MouseEvent): any => {
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
          setValue(absolutePosition);
        }
        window.onmouseup = () => {
          setEnabled(false);
        };
      }
    };
  }, [enabled]);

  useEffect(() => {
    onChange({
      reinvest: value,
      withdraw: 100 - value,
    });
  }, [value]);

  const DepositSlider = () => {
    return (
      <Layout style={style} className={className}>
        <TextContainer>
          <Label variant="body2" weight="demibold" color="neutral200">
            Reinvest
          </Label>
          <Label variant="body2" weight="demibold" color="highlighted">
            {value}%
          </Label>
        </TextContainer>
        <Bar margin={7} ref={sliderRef}>
          <Line variant="left" />
          <Line variant="middle" />
          <Line variant="right" />
          <DotContainer onMouseDown={() => setEnabled(true)} value={value}>
            <Dot />
          </DotContainer>
        </Bar>
        <TextContainer>
          <Label variant="body2" weight="demibold" color="neutral200">
            Withdraw
          </Label>
          <Label variant="body2" weight="demibold" color="highlighted">
            {100 - value}%
          </Label>
        </TextContainer>
      </Layout>
    );
  };

  const WithdrawSlider = () => {
    return (
      <Layout style={style} className={className}>
        <TextContainer>
          <Label variant="body2" weight="demibold" color="neutral200">
            0%
          </Label>
        </TextContainer>
        <Bar margin={12} ref={sliderRef}>
          <PercentContainer value={value}>
            <Label variant="body2" weight="demibold" color="highlighted">
              {value}%
            </Label>
          </PercentContainer>
          <Line variant="left" />
          <Line variant="middle" />
          <Line variant="right" />
          <DotContainer onMouseDown={() => setEnabled(true)} value={value}>
            <Dot />
          </DotContainer>
        </Bar>
        <TextContainer>
          <Label variant="body2" weight="demibold" color="neutral200">
            100%
          </Label>
        </TextContainer>
      </Layout>
    );
  };

  const Slider = () => {
    switch (type) {
      case SliderTypes.withdraw: {
        return <WithdrawSlider />;
      }
      case SliderTypes.deposit: {
        return <DepositSlider />;
      }
      default:
        return (
          <>
            {label && (
              <Header>
                <Typography variant={"labelm"} color={"neutral200"}>
                  {label}
                </Typography>
              </Header>
            )}
            <Layout style={style} className={className}>
              <TextContainer>
                <Label variant="body2" weight="demibold" color="neutral200">
                  Reinvest
                </Label>
                <Label variant="body2" weight="demibold" color="highlighted">
                  {value}%
                </Label>
              </TextContainer>
              <Bar ref={sliderRef}>
                <Line variant="left" />
                <Line variant="middle" />
                <Line variant="right" />
                <DotContainer onMouseDown={() => setEnabled(true)} value={value}>
                  <Dot />
                </DotContainer>
              </Bar>
              <TextContainer>
                <Label variant="body2" weight="demibold" color="neutral200">
                  Withdraw
                </Label>
                <Label variant="body2" weight="demibold" color="highlighted">
                  {100 - value}%
                </Label>
              </TextContainer>
            </Layout>
          </>
        );
    }
  };

  return Slider();
};

export default InvestSlider;
