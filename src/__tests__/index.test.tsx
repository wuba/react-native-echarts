/**
 * @jest-environment @shopify/react-native-skia/jestEnv.mjs
 */
// tests for basic props
import React from 'react';
import { render } from '@testing-library/react-native';
import SkiaComponent from '../skiaChart';
import SVGComponent from '../svgChart';
const Components = [SkiaComponent, SVGComponent];
const svg = `<svg width="100" height="100" viewBox="0 0 100 100">`;
const node = {
  tag: 'svg',
  attrs: {
    width: 100,
    height: 100,
    viewBox: '0 0 100 100',
  },
};

Components.forEach((Component) => {
  describe(`${Component.displayName} Component` || 'unknown', () => {
    it('renders correctly', () => {
      const { toJSON } = render(<Component />);
      expect(toJSON()).toMatchSnapshot();
    });

    it('renders Canvas when svgString is provided', () => {
      const { queryByTestId, toJSON } = render(
        <Component svg={svg} node={node} />
      );
      expect(toJSON()).toMatchSnapshot();
      expect(queryByTestId('component')).not.toBeNull();
    });

    it('does not render Canvas when svgString is not provided', () => {
      const { queryByTestId, toJSON } = render(<Component />);
      expect(toJSON()).toMatchSnapshot();
      expect(queryByTestId('component')).toBeNull();
    });

    it('renders GestureHandler when handleGesture is true and useRNGH is ture', () => {
      const { queryByTestId, toJSON } = render(
        <Component svg={svg} node={node} useRNGH />
      );
      expect(toJSON()).toMatchSnapshot();
      expect(queryByTestId('gesture-handler')).not.toBeNull();
      expect(queryByTestId('pan-responder-handler')).toBeNull();
    });

    it('renders PanResponderHandler when handleGesture is true and useRNGH is false', () => {
      const { queryByTestId, toJSON } = render(
        <Component svg={svg} node={node} useRNGH={false} />
      );
      expect(toJSON()).toMatchSnapshot();
      expect(queryByTestId('gesture-handler')).toBeNull();
      expect(queryByTestId('pan-responder-handler')).not.toBeNull();
    });

    it('does not render GestureHandler when handleGesture is false', () => {
      const { queryByTestId, toJSON } = render(
        <Component svg={svg} node={node} handleGesture={false} />
      );
      expect(toJSON()).toMatchSnapshot();
      expect(queryByTestId('gesture-handler')).toBeNull();
      expect(queryByTestId('pan-responder-handler')).toBeNull();
    });
  });
});
