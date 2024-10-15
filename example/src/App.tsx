import * as React from 'react';
import { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {
  SVGRenderer,
  SvgChart,
  SkiaRenderer,
  SkiaChart,
} from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';

// register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  SkiaRenderer,
  // ...
  BarChart,
  LineChart,
]);

const E_HEIGHT = 250;
const E_WIDTH = Dimensions.get('screen').width;

function SkiaComponent({ option }: any) {
  const skiaRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        // @ts-ignore
        renderer: 'skia',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SkiaChart ref={skiaRef} />;
}

function SvgComponent({ option }: any) {
  const svgRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (svgRef.current) {
      chart = echarts.init(svgRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SvgChart ref={svgRef} useRNGH />;
}
const fontFamily = Platform.select({
  ios: 'PingFang SC',
  android: 'sans-serif',
});
const option = {
  xAxis: {
    type: 'category',
    data: ['周一', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  tooltip: {
    trigger: 'axis',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
    {
      data: [220, 100, 180, 160, 150, 120, 110],
      type: 'line',
    },
  ],
  textStyle: {
    fontFamily,
  },
};
function App() {
  return (
    <View style={styles.container}>
      <SkiaComponent option={option} />
      <SvgComponent option={option} />
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
export default gestureHandlerRootHOC(App);
