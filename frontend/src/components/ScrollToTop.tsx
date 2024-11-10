import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt zum oberen Rand des Bildschirms
  }, [pathname]); // Abhängig von Änderungen in der Route

  return null;
};

export default ScrollToTop;
