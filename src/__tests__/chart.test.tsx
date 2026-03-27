// tests for echarts generated chart snapshots + events handling
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
    }
  }
}
import React, { useEffect, useRef } from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react-native';
import SVGComponent from '../svg/svgChart';
import SkiaComponent from '../skia/skiaChart';
import { dispatchEventsToZRender } from '../components/events';
import { SVGRenderer } from '../svg/SVGRenderer';
import { SkiaRenderer } from '../skia/SkiaRenderer';
import * as echarts from 'echarts/core';
import type { EChartsType } from 'echarts/core';
import type {
  RNGestureHandlerGesture,
  ChartElement,
  DefaultRNGestures,
  DispatchEvents,
} from '../types';
import { BarChart, LineChart, GraphChart, ScatterChart } from 'echarts/charts';
import {
  Gesture,
  State,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import type {
  PanGesture,
  PinchGesture,
  TapGesture,
} from 'react-native-gesture-handler';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';
const sharp = require('sharp');

const { toMatchImageSnapshot } = require('jest-image-snapshot');

function getSVGImage(svg: string) {
  const svgString = decodeURIComponent(
    svg.replace('data:image/svg+xml;charset=UTF-8,', '')
  );
  return sharp(Buffer.from(svgString)).png().toBuffer();
}

function getPNGImage(png: string) {
  const pngBuffer = Buffer.from(
    png.replace('data:image/png;base64,', ''),
    'base64'
  );
  return sharp(pngBuffer).png().toBuffer();
}

expect.extend({ toMatchImageSnapshot });

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
  SkiaRenderer,
  BarChart,
  LineChart,
  ScatterChart,
  GraphChart,
]);

type SnapshotTarget = {
  chart: EChartsType;
  element: (ChartElement & any) | null;
};

type ChartTestCase = {
  Component: React.ComponentType<any>;
  renderer: 'svg' | 'skia';
  snapshot: (target: SnapshotTarget) => Promise<void>;
};

const Components: ChartTestCase[] = [
  {
    Component: SVGComponent,
    renderer: 'svg',
    snapshot: async ({ chart }) => {
      const data = chart.getDataURL();

      expect(data).toBeDefined();
      expect(await getSVGImage(data)).toMatchImageSnapshot();
    },
  },
  {
    Component: SkiaComponent,
    renderer: 'skia',
    snapshot: async ({ element }) => {
      const data = await element?.elm.makeImageSnapshotAsync?.();

      expect(data).toBeDefined();
      expect(data).not.toBeNull();
      expect(await getPNGImage(data)).toMatchImageSnapshot();
    },
  },
];

const E_HEIGHT = 250;
const E_WIDTH = 430;
const DEFAULT_SERIES_COLOR = 'orange';
const DEFAULT_GRAPH_COLORS = ['green', 'blue'] as const;

function getOption(type = 'bar', color = DEFAULT_SERIES_COLOR) {
  return {
    animation: false,
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
        type,
        itemStyle: {
          color,
        },
        emphasis: {
          itemStyle: {
            color: 'black',
          },
        },
      },
    ],
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getOptionTwo(colors = DEFAULT_GRAPH_COLORS) {
  return {
    animation: false,
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut' as any, // Temporarily cast to any for test
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
          show: true,
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20,
        },
        data: [
          {
            name: '1',
            x: 300,
            y: 300,
            itemStyle: {
              color: colors[0],
            },
            emphasis: {
              scale: 2,
            },
          },
          {
            name: '2',
            x: 800,
            y: 300,
            itemStyle: {
              color: colors[1],
            },
          },
        ],
        links: [
          {
            source: 0,
            target: 1,
            symbolSize: [5, 20],
            label: {
              show: true,
            },
            lineStyle: {
              width: 5,
              curveness: 0.2,
            },
          },
        ],
      },
    ],
  };
}

function tapElement(pan: ReactTestInstance, x: number, y: number) {
  ['startShouldSetResponder', 'responderGrant', 'responderRelease'].forEach(
    (event, index) => {
      fireEvent(pan, event, {
        nativeEvent: { x, y },
        touchHistory: {
          mostRecentTimeStamp: index,
          touchBank: [],
        },
      });
    }
  );
}

function moveElement(pan: ReactTestInstance, x: number, y: number) {
  const scale = 20;
  [
    'startShouldSetResponder',
    'responderGrant',
    'responderMove',
    'responderMove',
    'responderMove',
    'responderRelease',
  ].forEach((event, index) => {
    const nx = x + index * scale;
    fireEvent(pan, event, {
      nativeEvent: {
        x: nx,
        y,
        touches: [
          {
            locationX: nx,
            locationY: y,
          },
        ],
      },
      touchHistory: {
        mostRecentTimeStamp: index,
        touchBank: [],
      },
    });
  });
}

function zoomElement(pan: ReactTestInstance, x: number, y: number) {
  const scale = 30;
  [
    'startShouldSetResponder',
    'responderGrant',
    'responderMove',
    'responderMove',
    'responderMove',
    'responderRelease',
  ].forEach((event, index) => {
    const offset = (index + 1) * scale;
    const nx1 = x + offset;
    const ny1 = y + offset;
    const nx2 = x - offset;
    const ny2 = y - offset;
    fireEvent(pan, event, {
      nativeEvent: {
        touches: [
          {
            locationX: nx1,
            locationY: ny1,
          },
          {
            locationX: nx2,
            locationY: ny2,
          },
        ],
      },
      touchHistory: {
        mostRecentTimeStamp: index,
        touchBank: [],
      },
    });
  });
}

interface ChartCall {
  call: (chart: EChartsType) => void;
  snapshot?: (target: SnapshotTarget) => Promise<void>;
}

function Chart({
  testCase,
  useRNGH = false,
  gesture,
  handleGesture = true,
  onChartReady,
}: {
  testCase: ChartTestCase;
  useRNGH?: boolean;
  gesture?: RNGestureHandlerGesture;
  handleGesture?: boolean;
  onChartReady?: (
    chart: EChartsType,
    element: (ChartElement & any) | null
  ) => void;
}) {
  const ref = useRef<(ChartElement & any) | null>(null);

  useEffect(() => {
    let chart: EChartsType | undefined;
    if (ref.current) {
      // @ts-ignore
      chart = echarts.init(ref.current, 'light', {
        renderer: testCase.renderer as any,
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      onChartReady?.(chart, ref.current);
    }
    return () => chart?.dispose();
  }, [onChartReady, testCase.renderer]);

  return (
    <testCase.Component
      ref={ref}
      useRNGH={useRNGH}
      gesture={gesture}
      handleGesture={handleGesture}
    />
  );
}

function renderChart(
  props: Omit<React.ComponentProps<typeof Chart>, 'onChartReady'>
) {
  let chart: EChartsType | undefined;
  let element: (ChartElement & any) | null = null;

  const result = render(
    <Chart
      {...props}
      onChartReady={(nextChart, nextElement) => {
        chart = nextChart;
        element = nextElement;
      }}
    />
  );

  return {
    ...result,
    getChartTarget: (): SnapshotTarget => {
      expect(chart).toBeDefined();

      return {
        chart: chart!,
        element,
      };
    },
  };
}

async function runChartCalls(calls: ChartCall[], target: SnapshotTarget) {
  for (const call of calls) {
    call.call(target.chart);

    if (call.snapshot) {
      await new Promise((resolve) =>
        setTimeout(async () => {
          const result = call.snapshot?.(target);
          if (result instanceof Promise) {
            await result;
          }
          resolve(undefined);
        }, 0)
      );
    }
  }
}

Components.forEach((testCase) => {
  const { Component, snapshot } = testCase;

  describe(`${Component.displayName} Chart` || 'unknown', () => {
    it('renders correctly', async () => {
      const { toJSON, getByTestId, getChartTarget } = renderChart({
        testCase,
      });
      await act(async () => {
        await sleep(1000);
      });
      await runChartCalls(
        [
          {
            call: (chart: EChartsType) => {
              chart.setOption(getOption('line'));
            },
            snapshot,
          },
        ],
        getChartTarget()
      );
      expect(toJSON()).toMatchSnapshot();
      expect(() => getByTestId('pan-responder-handler')).not.toThrow();
    });
    it('fire dispatchEventsToZRender correctly', async () => {
      const { toJSON, getChartTarget } = renderChart({
        testCase,
      });
      await act(async () => {
        await sleep(1000);
      });
      await runChartCalls(
        [
          {
            call: (chart: EChartsType) => {
              act(() => chart.setOption(getOption()));
            },
            snapshot,
          },
          {
            call: (chart: EChartsType) => {
              const id = chart.getZr().id;
              act(() =>
                dispatchEventsToZRender(
                  id,
                  ['mousedown', 'mousemove'],
                  {
                    locationX: 142,
                    locationY: 163,
                    timestamp: 1,
                    touches: [],
                  },
                  { zrX: 142, zrY: 163 }
                )
              );
            },
            snapshot,
          },
        ],
        getChartTarget()
      );
      expect(toJSON()).toMatchSnapshot();
    });
    it('renders correctly when handleGesture false', async () => {
      const { toJSON, getByTestId, getChartTarget } = renderChart({
        testCase,
        handleGesture: false,
      });
      await act(async () => {
        await sleep(1000);
      });
      await runChartCalls(
        [
          {
            call: (chart: EChartsType) => {
              chart.setOption(getOption('scatter'));
            },
            snapshot,
          },
        ],
        getChartTarget()
      );
      expect(toJSON()).toMatchSnapshot();
      expect(() => getByTestId('pan-responder-handler')).toThrow();
    });
    it('fire PanResponder tap & drag & pinch event correctly', async () => {
      const { toJSON, getByTestId, getChartTarget } = renderChart({
        testCase,
      });
      await act(async () => {
        await sleep(1000);
      });
      await runChartCalls(
        [
          {
            call: (chart: EChartsType) => {
              chart.setOption(getOptionTwo());
            },
            snapshot,
          },
          {
            call: () => {
              const pan = getByTestId('pan-responder-handler');
              tapElement(pan, 50, 130);
            },
            snapshot,
          },
          {
            call: () => {
              const pan = getByTestId('pan-responder-handler');
              moveElement(pan, 50, 130);
            },
            snapshot,
          },
          {
            call: () => {
              const pan = getByTestId('pan-responder-handler');
              zoomElement(pan, 200, 125);
            },
            snapshot,
          },
        ],
        getChartTarget()
      );
      expect(toJSON()).toMatchSnapshot();
    });
    it('fire RNGH tap & drag & pinch event correctly', async () => {
      const RNGHChart = gestureHandlerRootHOC(Chart);
      let chart: EChartsType | undefined;
      let element: (ChartElement & any) | null = null;

      const { toJSON } = render(
        <RNGHChart
          testCase={testCase}
          useRNGH
          onChartReady={(nextChart, nextElement) => {
            chart = nextChart;
            element = nextElement;
          }}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(chart).toBeDefined();
      await runChartCalls(
        [
          {
            call: (instance: EChartsType) => {
              instance.setOption(getOptionTwo());
            },
            snapshot,
          },
          {
            call: () => {
              const pan = getByGestureTestId('RNGH-tap-handler');
              const position = { x: 60, y: 140 };
              fireGestureHandler<TapGesture>(pan, [
                { state: State.BEGAN, ...position },
                { state: State.ACTIVE, ...position },
                { state: State.END, ...position },
              ]);
            },
            snapshot,
          },
          {
            call: () => {
              const pan = getByGestureTestId('RNGH-pan-handler');
              const position = { x: 60, y: 140 };
              fireGestureHandler<PanGesture>(pan, [
                { state: State.BEGAN, ...position },
                { state: State.ACTIVE, ...position },
                { x: 60, y: 160 },
                { x: 60, y: 180 },
                { state: State.END, ...position },
              ]);
            },
            snapshot,
          },
          {
            call: () => {
              const pinch = getByGestureTestId('RNGH-pinch-handler');
              const position = { x: 200, y: 125, focalX: 200, focalY: 125 };
              fireGestureHandler<PinchGesture>(pinch, [
                { state: State.BEGAN, ...position },
                { state: State.ACTIVE, ...position },
                { velocity: 30, ...position },
                { velocity: 60, ...position }, // throttled
                { state: State.END, ...position },
              ]);
            },
            snapshot,
          },
        ],
        {
          chart: chart!,
          element,
        }
      );
      expect(toJSON()).toMatchSnapshot();
    });
    it('support Custom gestures correctly when use RNGH - function', async () => {
      const RNGHChart = gestureHandlerRootHOC(Chart);
      const gesture = jest.fn();
      render(
        <RNGHChart
          testCase={testCase}
          useRNGH
          gesture={(
            defaultGestures: DefaultRNGestures,
            dispatchEvents: DispatchEvents
          ) => {
            gesture(defaultGestures, dispatchEvents);
            return defaultGestures[0];
          }}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(gesture).toHaveBeenCalledTimes(1);
      expect(gesture).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
        ]),
        expect.any(Function)
      );
    });
    it('support Custom gestures correctly when use RNGH - gesture', async () => {
      const RNGHChart = gestureHandlerRootHOC(Chart);
      render(
        <RNGHChart
          testCase={testCase}
          useRNGH
          gesture={Gesture.Pan().withTestId('RNGH-pan-handler-test')}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(() => getByGestureTestId('RNGH-pan-handler-test')).not.toThrow();
      expect(() => getByGestureTestId('RNGH-pan-handler')).toThrow();
    });
    it('support Custom gestures correctly when use RNGH - gesture array', async () => {
      const RNGHChart = gestureHandlerRootHOC(Chart);
      render(
        <RNGHChart
          testCase={testCase}
          useRNGH
          gesture={[
            Gesture.Pan().withTestId('RNGH-pan-handler-test-one'),
            Gesture.Pan().withTestId('RNGH-pan-handler-test-two'),
          ]}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(() =>
        getByGestureTestId('RNGH-pan-handler-test-one')
      ).not.toThrow();
      expect(() =>
        getByGestureTestId('RNGH-pan-handler-test-two')
      ).not.toThrow();
      expect(() => getByGestureTestId('RNGH-pan-handler')).toThrow();
    });
  });
});
