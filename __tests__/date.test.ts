import { getFormattedDate, isWeekday } from '../src/utils/date';
import { game } from '../src/logic';

beforeAll(() => {
  game.startGame();
});

describe('getFormattedDate()', () => {
  it('Gets the formatted date correctly.', () => {
    expect(getFormattedDate()).toBe(new Date().toDateString());
  });
});
describe('isWeekday()', () => {
  it('Checks if it is a weekday correctly.', () => {
    // Returns false on weekends.
    expect(isWeekday('Sat Oct 19 2019')).toBe(false);
    expect(isWeekday('Sun Oct 20 2019')).toBe(false);

    // Returns true on weekdays.
    expect(isWeekday('Mon Oct 21 2019')).toBe(true);
    expect(isWeekday('Tue Oct 22 2019')).toBe(true);
    expect(isWeekday('Wed Oct 23 2019')).toBe(true);
    expect(isWeekday('Thu Oct 24 2019')).toBe(true);
    expect(isWeekday('Fri Oct 26 2019')).toBe(true);
  });
});
