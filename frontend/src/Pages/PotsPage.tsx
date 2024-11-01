import './PotsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { EPPot } from '../types/EPPot';
import { PotCard } from '../components/pots/PotCard';
import { getPots } from '../globals/services/PotService';

export function PotsPage() {
  const pots = getPots();
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
