import React, { memo, forwardRef } from 'react';

interface ChartProps {}

function ChartComponent(_props: ChartProps, ref?: any) {
  return <div ref={ref} />;
}

export default memo(forwardRef(ChartComponent));
