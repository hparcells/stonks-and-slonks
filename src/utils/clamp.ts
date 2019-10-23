/**
 * @fileoverview This file allows easy clamping of values.
 * @author Nathan Alex
 */

/**
 * Clamps a value between two numbers.
 * @param value The number being clamped.
 * @param min The smallest the number being clamped can be.
 * @param max The biggest the number being clamped can be.
 * @returns The clamped number.
 */
export default function clamp(value = 0, min = -Infinity, max = Infinity) {
  let clampedValue = value;

  // Check if the value is smaller than the minimum.
  if (clampedValue < min) {
    // The value is smaller.
    clampedValue = min;
  }

  // Check if the value is bigger than the maximum.
  if (clampedValue > max) {
    // The value is bigger.
    clampedValue = max;
  }

  // Return the clamped value.
  return clampedValue;
}
