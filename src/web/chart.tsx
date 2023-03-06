import React, { memo, forwardRef } from 'react';
import { View } from 'react-native';

interface ChartProps {}

function ChartComponent(_props: ChartProps, ref?: any) {
  return <View ref={ref} />;
}

export default memo(forwardRef(ChartComponent));
