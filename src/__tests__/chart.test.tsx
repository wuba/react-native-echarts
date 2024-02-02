/**
 * @jest-environment @shopify/react-native-skia/jestEnv.mjs
 */
// tests for echarts generated svg snapshot + events handling
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
    }
  }
}
import React, { useEffect, useRef } from 'react';
import { ReactTestInstance } from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react-native';
import SkiaComponent from '../skiaChart';
import SVGComponent from '../svgChart';
import { dispatchEventsToZRender } from '../components/events';
import { SVGRenderer } from '../SVGRenderer';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, GraphChart, ScatterChart } from 'echarts/charts';
import {
  PanGesture,
  Gesture,
  PinchGesture,
  State,
  TapGesture,
  gestureHandlerRootHOC,
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
  BarChart,
  LineChart,
  ScatterChart,
  GraphChart,
]);

const Components = [SkiaComponent, SVGComponent];
const E_HEIGHT = 250;
const E_WIDTH = 430;
let i = 0;
const rainbow = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
];
function getOption(type = 'bar') {
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
          color: rainbow[i++ % rainbow.length],
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

function getOptionTwo() {
  return {
    animation: false,
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
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
              color: rainbow[i++ % rainbow.length],
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
              color: rainbow[i++ % rainbow.length],
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
  call: (chart: any) => void;
  snapshot?: (data: string) => any;
}

function Chart({
  Component,
  calls = [],
  useRNGH = false,
  gesture,
  handleGesture = true,
}: {
  Component: React.ComponentType<any>;
  calls?: ChartCall[];
  useRNGH?: boolean;
  gesture?: any;
  handleGesture?: boolean;
}) {
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
      (async () => {
        for (const call of calls) {
          call.call(chart);
          if (call.snapshot) {
            await new Promise((resolve) =>
              setTimeout(async () => {
                const result = call.snapshot?.(chart.getDataURL());
                if (result instanceof Promise) {
                  await result;
                }
                resolve(undefined);
              }, 0)
            );
          }
        }
      })();
    }
    return () => chart?.dispose();
  }, [calls]);

  return (
    <Component
      ref={ref}
      useRNGH={useRNGH}
      gesture={gesture}
      handleGesture={handleGesture}
    />
  );
}
function snapshot(data: string) {
  expect(data).toBeDefined();
  return getSVGImage(data).then((d: Buffer) => {
    expect(d).toMatchImageSnapshot();
  });
}
Components.forEach((Component) => {
  describe(`${Component.displayName} Chart` || 'unknown', () => {
    it('renders correctly', async () => {
      const { toJSON, getByTestId } = render(
        <Chart
          Component={Component}
          calls={[
            {
              call: (chart: any) => {
                chart.setOption(getOption('line'));
              },
              snapshot,
            },
          ]}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(toJSON()).toMatchSnapshot();
      expect(() => getByTestId('pan-responder-handler')).not.toThrow();
    });
    it('fire dispatchEventsToZRender correctly', async () => {
      const { toJSON } = render(
        <Chart
          calls={[
            {
              call: (chart: any) => {
                act(() => chart.setOption(getOption()));
              },
              snapshot,
            },
            {
              call: (chart: any) => {
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
          ]}
          Component={Component}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(toJSON()).toMatchSnapshot();
    });
    it('renders correctly when handleGesture false', async () => {
      const { toJSON, getByTestId } = render(
        <Chart
          Component={Component}
          handleGesture={false}
          calls={[
            {
              call: (chart: any) => {
                chart.setOption(getOption('scatter'));
              },
              snapshot,
            },
          ]}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(toJSON()).toMatchSnapshot();
      expect(() => getByTestId('pan-responder-handler')).toThrow();
    });
    it('fire PanResponder tap & drag & pinch event correctly', async () => {
      const { toJSON, getByTestId } = render(
        <Chart
          Component={Component}
          calls={[
            {
              call: (chart: any) => {
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
          ]}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(toJSON()).toMatchSnapshot();
    });
    it('fire RNGH tap & drag & pinch event correctly', async () => {
      const RNGHChart = gestureHandlerRootHOC(Chart);
      const { toJSON } = render(
        <RNGHChart
          Component={Component}
          useRNGH
          calls={[
            {
              call: (chart: any) => {
                chart.setOption(getOptionTwo());
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
          ]}
        />
      );
      await act(async () => {
        await sleep(1000);
      });
      expect(toJSON()).toMatchSnapshot();
    });
    it('support Custom gestures correctly when use RNGH - function', async () => {
      const RNGHChart = gestureHandlerRootHOC(Chart);
      const gesture = jest.fn();
      render(
        <RNGHChart
          Component={Component}
          useRNGH
          gesture={(...args: any) => {
            gesture(...args);
            return args[0];
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
          Component={Component}
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
          Component={Component}
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
