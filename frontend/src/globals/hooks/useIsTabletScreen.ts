import { useEffect, useState } from 'react';

function useIsTabletScreen(): boolean {
  const [isTabletScreen, setIsTabletScreen] = useState(window.innerWidth <= 960);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 960px)');

    const handleResize = (e: MediaQueryListEvent) => setIsTabletScreen(e.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return isTabletScreen;
}

export default useIsTabletScreen;
