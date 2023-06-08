export type ThrottledFunction<T extends any[]> = (...args: T) => void;

export function throttle<T extends any[]>(
  func: ThrottledFunction<T>,
  wait: number
) {
  let lastExecution = 0;
  return (...args: T) => {
    const now = Date.now();
    if (now - lastExecution >= wait) {
      lastExecution = now;
      func(...args);
    }
  };
}
