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
  return Math.min(Math.max(value, min), max);
}
