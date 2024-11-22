import './PotsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { EPPot } from '../model/entrypoints/EPPot';
import { getPots } from '../globals/services/PotService';
import { useEffect, useState } from 'react';
import PotPageGrid from '../components/pots/PotPageGrid';

export function PotsPage() {
  const [pots, setPots] = useState<EPPot[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPots = async (): Promise<void> => {
      const fetchedPots: EPPot[] = await getPots();
      setPots(fetchedPots);
      setIsLoading(false);
    };
    fetchPots().then();
  }, []);

  return (
    <>
      <div className="potsPage" data-testid="pots-page">
        <HeaderBar h1Headline="Pots" buttonText="+ Add New Pot" />
        <PotPageGrid pots={pots} isLoading={isLoading} />
      </div>
    </>
  );
}
