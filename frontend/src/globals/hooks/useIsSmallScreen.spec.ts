import { renderHook } from '@testing-library/react';
import useIsSmallScreen from './useIsSmallScreen';
import { act } from 'react';

declare global {
  var mockChangeListener: (event: Event) => void;
}

describe('useIsSmallScreen', () => {
  beforeEach(() => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 600px)',
      addEventListener: jest.fn((type, listener) => {
        if (type === 'change') {
          global.mockChangeListener = listener;
        }
      }),
      removeEventListener: jest.fn(),
    }));
  });

  it('returns true when screen width is 600px or less', () => {
    Object.defineProperty(global, 'innerWidth', {
      configurable: true,
      value: 600,
    });
    const { result } = renderHook(() => useIsSmallScreen());

    expect(result.current).toBe(true);
  });

  it('returns false when screen width is greater than 600px', () => {
    Object.defineProperty(global, 'innerWidth', {
      configurable: true,
      value: 800,
    });
    const { result } = renderHook(() => useIsSmallScreen());

    expect(result.current).toBe(false);
  });

  it('updates the value when the screen is resized', () => {
    Object.defineProperty(global, 'innerWidth', {
      configurable: true,
      value: 600,
    });
    const { result } = renderHook(() => useIsSmallScreen());
    expect(result.current).toBe(true); // Sollte initial true sein

    Object.defineProperty(global, 'innerWidth', {
      configurable: true,
      value: 800,
    });

    act(() => {
      if (global.mockChangeListener) {
        global.mockChangeListener({ matches: false } as MediaQueryListEvent); // simuliert das Event
      }
    });

    expect(result.current).toBe(false);
  });
});
