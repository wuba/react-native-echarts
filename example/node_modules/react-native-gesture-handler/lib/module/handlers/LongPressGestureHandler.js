import createHandler from './createHandler';
import { baseGestureHandlerProps } from './gestureHandlerCommon';
export const longPressGestureHandlerProps = ['minDurationMs', 'maxDist'];
export const longPressHandlerName = 'LongPressGestureHandler';
// eslint-disable-next-line @typescript-eslint/no-redeclare -- backward compatibility; see description on the top of gestureHandlerCommon.ts file
export const LongPressGestureHandler = createHandler({
  name: longPressHandlerName,
  allowedProps: [...baseGestureHandlerProps, ...longPressGestureHandlerProps],
  config: {
    shouldCancelWhenOutside: true
  }
});
//# sourceMappingURL=LongPressGestureHandler.js.map