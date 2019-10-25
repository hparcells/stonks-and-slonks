import clamp from '../src/utils/clamp';

describe('clamp()', () => {
  it('Providing a minimum value larger than the maximum value throws error.', () => {
    expect(() => {
      clamp(7, 10, 5);
    }).toThrowError('Minumum value cannot be greater than the maximum value.');
  });
  it('Clamps numbers correctly.', () => {
    // No clamping.
    expect(clamp(7, 5, 10)).toBe(7);

    // Claming a smaller number.
    expect(clamp(3, 5, 10)).toBe(5);

    // Clamping a larger number.
    expect(clamp(12, 5, 10)).toBe(10);

    // No clamping (with no arguments).
    expect(clamp(69)).toBe(69);
  });
});
