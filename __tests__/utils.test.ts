import { describe, it, expect } from 'vitest';
import { getTechImage } from '../src/utils/techImage';
import { RadiansToDegrees } from '../src/utils/maths';
import { shuffleArray } from '../src/utils/shuffleArray';

describe('Utils : getTechImage', () => {
  it('Should return the correct path for a standard technology', () => {
    expect(getTechImage('Python')).toBe('techs/python.webp');
    expect(getTechImage('React')).toBe('techs/react.webp');
  });

  it('Should replace spaces with hyphens', () => {
    expect(getTechImage('Tailwind CSS')).toBe('techs/tailwind-css.webp');
    expect(getTechImage('React Native')).toBe('techs/react-native.webp');
  });

  it('Should remove periods from the name', () => {
    expect(getTechImage('Node.js')).toBe('techs/nodejs.webp');
    expect(getTechImage('Vue.js')).toBe('techs/vuejs.webp');
  });

  it('Should respect the exceptions dictionary', () => {
    expect(getTechImage('C++')).toBe('techs/cpp.webp');
    expect(getTechImage('C#')).toBe('techs/csharp.webp');
    expect(getTechImage('.NET')).toBe('techs/dotnet.webp');
  });
});

describe('Utils : RadiansToDegrees', () => {
    it('Should convert radians to degrees correctly', () => {
    expect(RadiansToDegrees(Math.PI)).toBeCloseTo(180);
    expect(RadiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
    expect(RadiansToDegrees(Math.PI / 4)).toBeCloseTo(45);
    expect(RadiansToDegrees(0)).toBeCloseTo(0);
    expect(RadiansToDegrees(-Math.PI / 2)).toBeCloseTo(-90);
    });
});

describe('Utils : shuffleArray', () => {
  it('Should shuffle an array and return a new array', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);
    expect(shuffledArray).not.toEqual(originalArray);
  });

    it('Should maintain the same length after shuffling', () => {
      const originalArray = [1, 2, 3, 4, 5];
      const shuffledArray = shuffleArray(originalArray);
      expect(shuffledArray).toHaveLength(originalArray.length);
    });
});
