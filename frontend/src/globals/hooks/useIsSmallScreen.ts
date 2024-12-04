import { useEffect, useState } from 'react';

const useIsSmallScreen: () => boolean = (): boolean => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia('(max-width: 600px)');

    const handleResize: (e: MediaQueryListEvent) => void = (e: MediaQueryListEvent) =>
      setIsSmallScreen(e.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return isSmallScreen;
};

export default useIsSmallScreen;
