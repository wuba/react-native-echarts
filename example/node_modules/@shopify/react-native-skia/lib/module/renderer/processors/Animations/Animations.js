export const isValue = value => {
  if (value === undefined || value === null) {
    return false;
  }

  try {
    if (typeof value === "object" && "__typename__" in value && value.__typename__ === "RNSkValue") {
      return true;
    }
  } catch {}

  return false;
};
export const isSelector = value => {
  if (value) {
    return typeof value === "object" && "selector" in value && "value" in value && value.selector !== undefined && value.value !== undefined;
  }

  return false;
};
export const isAnimated = props => {
  for (const value of Object.values(props)) {
    if (isValue(value) || isSelector(value)) {
      return true;
    }
  }

  return false;
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any
//# sourceMappingURL=Animations.js.map