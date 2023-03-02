import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SVGRenderer, SkiaChart, echarts } from 'wrn-echarts';

echarts.use([SVGRenderer]);

const E_HEIGHT = 400;
const E_WIDTH = Dimensions.get('screen').width;

export default function App() {
  const skiaRef = useRef<any>(null);
  useEffect(() => {
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  return (
    <View style={styles.container}>
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