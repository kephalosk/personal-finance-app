import { useEffect, useState } from 'react';

const useIsTabletScreen: () => boolean = (): boolean => {
  const [isTabletScreen, setIsTabletScreen] = useState(window.innerWidth <= 960);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia('(max-width: 960px)');

    const handleResize: (e: MediaQueryListEvent) => void = (e: MediaQueryListEvent) =>
      setIsTabletScreen(e.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return isTabletScreen;
};

export default useIsTabletScreen;
