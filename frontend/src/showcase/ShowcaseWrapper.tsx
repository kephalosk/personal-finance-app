import { ReactNode, useEffect } from 'react';
import { useSidebar } from '../globals/hooks/useSidebar';
import { useLocation } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const ShowcaseWrapper: ({ children }: Props) => ReactNode = ({ children }: Props): ReactNode => {
  const { setIsHidden } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    setIsHidden(location.pathname.includes('showcase'));
  }, [location.pathname, setIsHidden]);

  return <>{children}</>;
};

export default ShowcaseWrapper;
