import { describe, it, expect, afterAll } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../src/hooks/useMediaQuery';

describe('Hook : useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;

  afterAll(() => {
    window.innerWidth = originalInnerWidth;
  });

  it('should return "true" if the width is less than the breakpoint', () => {
    window.innerWidth = 500;
    
    const { result } = renderHook(() => useIsMobile(900));

    expect(result.current).toBe(true);
  });

  it('should update when the window is resized', () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => useIsMobile(900));
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);
  });
});