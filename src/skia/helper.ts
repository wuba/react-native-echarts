const EPSILON = 1e-4;
export function isAroundZero(transform: number) {
  return transform < EPSILON && transform > -EPSILON;
}
