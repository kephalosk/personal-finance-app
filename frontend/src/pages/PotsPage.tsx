import './PotsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { EPPot } from '../model/entrypoints/EPPot';
import { getPots } from '../globals/services/PotService';
import React, { useEffect, useState } from 'react';
import PotPageGrid from '../components/pots/PotPageGrid';

const PotsPage: () => React.ReactNode = () => {
  const [pots, setPots] = useState<EPPot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect((): void => {
    const fetchPots = async (): Promise<void> => {
      const fetchedPots: EPPot[] = await getPots();
      setPots(fetchedPots);
      setIsLoading(false);
    };
    fetchPots().then();
  }, []);

  const addNewPot = (): void => {};

  return (
    <>
      <div className="potsPage" data-testid="pots-page">
        <HeaderBar h1Headline="Pots" buttonText="+ Add New Pot" handleClick={addNewPot} />
        <PotPageGrid pots={pots} isLoading={isLoading} />
      </div>
    </>
  );
};

export default PotsPage;
