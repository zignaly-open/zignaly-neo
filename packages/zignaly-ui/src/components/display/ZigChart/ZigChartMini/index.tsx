import React from "react";
import { VictoryArea, VictoryContainer, VictoryGroup, VictoryLine } from "victory";
import { ChartLayoutMini } from "../styles";
import { ChartMiniProps } from "../types";
import { useChartData } from "../hooks";
import GraphColors from "../GraphColors";

const ZigChartMini = ({
  data,
  midLine,
  height,
  width,
  gradientVariant = "short",
}: ChartMiniProps) => {
  const { data: processedData, color, gradient } = useChartData(data, gradientVariant);

  return (
    <ChartLayoutMini height={height}>
      <GraphColors variant={gradientVariant} />
      <VictoryGroup
        padding={{ top: 5, bottom: 10 }}
        height={height}
        width={width}
        containerComponent={<VictoryContainer responsive={!width || !height} />}
      >
        <VictoryArea
          style={{
            data: {
              fill: `url(#${gradient})`,
              strokeWidth: 2,
              stroke: color,
            },
          }}
          data={processedData}
          interpolation="monotoneX"
        />
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
            data={[
              { x: 0, y: 0 },
              { x: processedData.length, y: 0 },
            ]}
          />
        )}
      </VictoryGroup>
    </ChartLayoutMini>
  );
};

export default ZigChartMini;
