import type { LineItem } from "./types";

// Renders an item's magnitude and concrete effect for a given (possibly
// adjusted) value, so the Adjust stepper in the detail overlay reads as a real
// override of the recommended cut.
export function formatAdjustment(
  item: LineItem,
  value: number | null,
): { magnitude: string; effect?: string } {
  if (item.direction === "hold" || value == null) {
    return { magnitude: item.magnitude, effect: item.effect };
  }
  const prefix = item.magnitudePrefix ?? "Reduce by";
  if (item.unit === "rolls") {
    return {
      magnitude: `${prefix} ${value} rolls`,
      effect: `${value} fewer rolls`,
    };
  }
  if (item.unit === "kgs") {
    return {
      magnitude: `${prefix} ${value}kgs`,
      effect: `${value} kgs saved`,
    };
  }
  return { magnitude: item.magnitude, effect: item.effect };
}

// Clamp a stepped value into a sensible range for its unit.
export function clampValue(value: number): number {
  return Math.max(0, value);
}
