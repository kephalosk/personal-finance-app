import './ScrollToTop.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: () => null = (): null => {
  const { pathname } = useLocation();

  useEffect((): void => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
