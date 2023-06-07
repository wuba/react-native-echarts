export function throttle(func: Function, wait: number) {
  let lastExecution = 0;
  return (...args: any) => {
    const now = Date.now();
    if (now - lastExecution >= wait) {
      lastExecution = now;
      func(...args);
    }
  };
}
