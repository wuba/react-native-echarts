// Original example: https://echarts.apache.org/examples/en/editor.html?c=area-simple
// The following code is modified from
// https://github.com/apache/echarts-examples/blob/gh-pages/public/examples/ts/area-simple.ts
// under Apache License 2.0.

import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SVGRenderer, SkiaChart, echarts } from "@wuba/react-native-echarts";

echarts.use([SVGRenderer]);

export default function App() {
    const skiaRef = useRef<any>(null);
    const [chartWidth, setChartWidth] = useState<number>(0);
    const [chartHeight, setChartHeight] = useState<number>(0);
  
    useEffect(() => {
      Dimensions.addEventListener("change", handleDimensionsChange);
      return () => {
        Dimensions.removeEventListener("change", handleDimensionsChange);
      };
    }, []);
  
    useEffect(() => {
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "value",
          min: "dataMin",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            areaStyle: {
              color: "rgba(230, 231, 231,0.8)",
            },
            lineStyle: {
              color: "#d6d6d7",
            },
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              color: "#24262a",
            },
          },
        ],
      };
      let chart: any;
      if (skiaRef.current) {
        chart = echarts.init(skiaRef.current, "light", {
          renderer: "svg",
          width: chartWidth,
          height: chartHeight,
        });
        chart.setOption(option);
      }
      chart.resize({
        width: chartWidth,
        height: chartHeight,
      });
      return () => chart?.dispose();
    }, [chartWidth, chartHeight]);

    // Get the width and height of the container
    const handleLayout = (e) => {
      const { width, height } = e.nativeEvent.layout;
      setChartWidth(width);
      setChartHeight(height);
    };

    // Screen orientation change event
    const handleDimensionsChange = (e) => {
      const { width, height } = e.screen;
      setChartWidth(width);
      setChartHeight(height);
    };

    // The parent container box must have width and height in order to inherit
    return (
      <View style={styles.container} onLayout={handleLayout}>
        <SkiaChart ref={skiaRef} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});