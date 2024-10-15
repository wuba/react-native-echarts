// Original example: https://echarts.apache.org/examples/en/editor.html?c=area-simple
// The following code is modified from
// https://github.com/apache/echarts-examples/blob/gh-pages/public/examples/ts/area-simple.ts
// under Apache License 2.0.

import { useRef, useEffect, useCallback, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { SkiaRenderer, SkiaChart, echarts } from '@wuba/react-native-echarts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

echarts.use([SkiaRenderer]);

const E_HEIGHT = 400;
const E_WIDTH = Dimensions.get('window').width;

let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];
let data = [Math.random() * 300];
for (let i = 1; i < 20000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

const option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  title: {
    left: 'center',
    text: 'Large Area Chart'
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: date
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10
    },
    {
      start: 0,
      end: 10
    }
  ],
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }
        ])
      },
      data: data
    }
  ]
};

export default function App() {
  const skiaRef = useRef<any>(null);
  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'skia',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);
  const [isZooming, setIsZooming] = useState(false);
  const gesture = useCallback((defaultGestures) => {
    // Add long press to pan gesture
    defaultGestures[0].activateAfterLongPress(250);

    // Listen to pinch gesture
    defaultGestures[1].onStart(() => {
      setIsZooming(true);
    }).onEnd(() => {
      setIsZooming(false);
    });

    // Omit tap gesture
    return defaultGestures.slice(0, 2);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Text>Is zooming: {isZooming ? "Yes" : "No"}</Text>
      <View style={styles.container}>
        <SkiaChart ref={skiaRef} useRNGH gesture={gesture} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});