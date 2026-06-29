import type { LineItem } from "./types";

// Renders an item's magnitude and concrete effect for a given (possibly
// adjusted) value, so the Adjust stepper on screen 2 reads as a real override.
export function formatAdjustment(
  item: LineItem,
  value: number | null,
): { magnitude: string; effect?: string } {
  if (item.direction === "hold" || value == null) {
    return { magnitude: item.magnitude, effect: item.effect };
  }
  if (item.unit === "%") {
    // Soup base: 15% maps to ~5 kg, so scale the kg estimate proportionally.
    const kg = value * (5 / 15);
    return { magnitude: `Cut ${value}%`, effect: `≈${kg.toFixed(1)} kg less` };
  }
  if (item.unit === "rolls") {
    return { magnitude: `Drop par by ${value}`, effect: `${value} fewer rolls` };
  }
  return { magnitude: item.magnitude, effect: item.effect };
}

// Clamp a stepped value into a sensible range for its unit.
export function clampValue(unit: string | undefined, value: number): number {
  if (unit === "%") return Math.min(40, Math.max(0, value));
  return Math.max(0, value);
}
