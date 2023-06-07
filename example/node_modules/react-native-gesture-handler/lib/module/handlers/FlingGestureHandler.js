import createHandler from './createHandler';
import { baseGestureHandlerProps } from './gestureHandlerCommon';
export const flingGestureHandlerProps = ['numberOfPointers', 'direction'];
export const flingHandlerName = 'FlingGestureHandler';
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of gestureHandlerCommon.ts file
export const FlingGestureHandler = createHandler({
  name: flingHandlerName,
  allowedProps: [...baseGestureHandlerProps, ...flingGestureHandlerProps],
  config: {}
});
//# sourceMappingURL=FlingGestureHandler.js.map