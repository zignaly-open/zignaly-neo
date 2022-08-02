/* eslint-disable multiline-ternary */
import React, { useEffect, useState, useCallback } from "react";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryGroup, VictoryLine } from "victory";
import { Layout } from "./styles";
import { ChartInput, ChartsProps, largeStyle } from "./types";

export const AreaChart = ({ data, variant, midLine }: ChartsProps) => {
  const [gradientColor, setGradientColor] = useState<boolean>(false);
  const firstTimestamp = data[0].y;
  const lastTimeStamp = data[data.length - 1].y;

  const positiveOrNegative = useCallback(() => {
    if (firstTimestamp > lastTimeStamp) {
      setGradientColor(false);
    } else if (firstTimestamp <= lastTimeStamp) {
      setGradientColor(true);
    }
  }, [gradientColor]);

  useEffect(() => {
    positiveOrNegative();
  }, [data]);
  return (
    <div>
      <Layout variant={variant}>
        {variant === "large"
          ? LargeChart({ data: data, isGreen: gradientColor, midLine: midLine })
          : SmallChart({ data: data, isGreen: gradientColor, midLine: midLine })}
        {GraphColor({ isGreen: gradientColor })}
      </Layout>
    </div>
  );
};

const SmallChart = ({ data, isGreen, midLine }: ChartInput) => {
  const strokeColor = isGreen ? "#18ED90" : "#CC3993";

  return (
    <VictoryGroup>
      <VictoryArea
        style={{
          data: {
            fill: "url(#gradient)",
            strokeWidth: 4,
            stroke: strokeColor,
          },
        }}
        data={data}
      ></VictoryArea>
      {midLine && (
        <VictoryLine
          style={{
            data: {
              stroke: "grey",
              strokeDasharray: 6,
              strokeWidth: 2,
              strokeOpacity: 0.7,
            },
          }}
          x={0}
          y={() => data[0].y}
        ></VictoryLine>
      )}
    </VictoryGroup>
  );
};

const LargeChart = ({ data, isGreen, midLine }: ChartInput) => {
  const strokeColor = isGreen ? "#18ED90" : "#CC3993";

  return (
    <VictoryChart domainPadding={{ x: [0, -10], y: 5 }} domain={{ y: [0, 35] }}>
      <VictoryAxis dependentAxis style={largeStyle} />
      <VictoryArea
        style={{
          data: {
            fill: "url(#gradient)",
            strokeWidth: 3,
            stroke: strokeColor,
          },
        }}
        data={data}
      />
      <VictoryAxis style={largeStyle} />
      {midLine && (
        <VictoryLine
          style={{
            data: {
              stroke: "grey",
              strokeDasharray: 6,
              strokeWidth: 2,
              strokeOpacity: 0.7,
            },
          }}
          x={0}
          y={() => data[0].y}
        ></VictoryLine>
      )}
    </VictoryChart>
  );
};

const GraphColor = ({ isGreen }: { isGreen: boolean }) => {
  return (
    <div style={{ width: 0, height: 0 }}>
      {isGreen ? (
        <svg>
          <defs>
            <linearGradient id="gradient" x1="1%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(17, 27, 47, 0)" />
              <stop offset="50%" stopColor="rgba(22, 41, 67, 0.5)" />
              <stop offset="100%" stopColor="rgba(39, 110, 107, 1)" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg>
          <defs>
            <linearGradient id="gradient" x1="1%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(18, 20, 39, 0)" />
              <stop offset="50%" stopColor="rgba(21, 21, 57, 0.5)" />
              <stop offset="100%" stopColor="rgba(86, 36, 108, 1)" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};
