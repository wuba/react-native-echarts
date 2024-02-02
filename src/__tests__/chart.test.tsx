/**
 * @jest-environment @shopify/react-native-skia/jestEnv.mjs
 */
import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { render } from '@testing-library/react-native';
import SkiaComponent from '../skiaChart';
import SVGComponent from '../svgChart';
import { SVGRenderer } from '../SVGRenderer';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  BarChart,
]);
const Components = [SkiaComponent, SVGComponent];
const E_HEIGHT = 250;
const E_WIDTH = Dimensions.get('screen').width;//750
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200],
      type: 'bar',
    },
  ],
};
function Chart({ option, Component }: any) {
  const ref = useRef<any>(null);
  useEffect(() => {
    let chart: any;
    if (ref.current) {
      // @ts-ignore
      chart = echarts.init(ref.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <Component ref={ref} />;
}
Components.forEach((Component) => {
  describe(`${Component.displayName} Chart` || 'unknown', () => {
    it('renders correctly', () => {
      const { toJSON } = render(
        <Chart option={option} Component={Component} />
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
