import { renderHook } from '@testing-library/react';
import useIsTabletScreen from './useIsTabletScreen';
import { act } from 'react';

declare global {
  var mockChangeListener: (event: Event) => void;
}

describe('useIsTabletScreen', () => {
  beforeEach(() => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 960px)',
      addEventListener: jest.fn((type, listener) => {
        if (type === 'change') {
          global.mockChangeListener = listener;
        }
      }),
      removeEventListener: jest.fn(),
    }));
  });

  it('returns true when screen width is 960px or less', () => {
    Object.defineProperty(global, 'innerWidth', {
      configurable: true,
      value: 960,
    });
    const { result } = renderHook(() => useIsTabletScreen());

    expect(result.current).toBe(true);
  });

  it('returns false when screen width is greater than 960px', () => {
    Object.defineProperty(global, 'innerWidth', {
      configurable: true,
      value: 1000,
    });
    const { result } = renderHook(() => useIsTabletScreen());

    expect(result.current).toBe(false);
  });

  it('updates the value when the screen is resized', () => {
    Object.defineProperty(global, 'innerWidth', {
      configurable: true,
      value: 960,
    });
    const { result } = renderHook(() => useIsTabletScreen());
    expect(result.current).toBe(true);

    Object.defineProperty(global, 'innerWidth', {
      configurable: true,
      value: 1000,
    });

    act(() => {
      if (global.mockChangeListener) {
        global.mockChangeListener({ matches: false } as MediaQueryListEvent); // simuliert das Event
      }
    });

    expect(result.current).toBe(false);
  });
});
