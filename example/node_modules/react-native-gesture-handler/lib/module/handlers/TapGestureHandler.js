import createHandler from './createHandler';
import { baseGestureHandlerProps } from './gestureHandlerCommon';
export const tapGestureHandlerProps = ['maxDurationMs', 'maxDelayMs', 'numberOfTaps', 'maxDeltaX', 'maxDeltaY', 'maxDist', 'minPointers'];
export const tapHandlerName = 'TapGestureHandler';
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of gestureHandlerCommon.ts file
export const TapGestureHandler = createHandler({
  name: tapHandlerName,
  allowedProps: [...baseGestureHandlerProps, ...tapGestureHandlerProps],
  config: {
    shouldCancelWhenOutside: true
  }
});
//# sourceMappingURL=TapGestureHandler.js.map