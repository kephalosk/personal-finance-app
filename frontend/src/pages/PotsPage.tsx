import './PotsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { EPPot } from '../model/entrypoints/EPPot';
import { PotCard } from '../components/pots/PotCard';
import { getPots } from '../globals/services/PotService';
import { useEffect, useState } from 'react';

export function PotsPage() {
  const [pots, setPots] = useState<EPPot[]>([]);

  useEffect(() => {
    const fetchPots = async (): Promise<void> => {
      const fetchedPots: EPPot[] = await getPots();
      setPots(fetchedPots);
    };
    fetchPots().then();
  }, []);

  return (
    <>
      <div className="potsPage" data-testid="pots-page">
        <HeaderBar h1Headline="Pots" buttonText="+ Add New Pot" />
        <div className="potPageGrid">
          {pots.map((pot: EPPot, index: number) => (
            <PotCard key={index} pot={pot} />
          ))}
        </div>
      </div>
    </>
  );
}
