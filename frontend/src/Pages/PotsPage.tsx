import data from '../globals/data.json';
import './PotsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { EPPot } from '../types/EPPot';
import { PotCard } from '../components/pots/PotCard';

export function PotsPage() {
  const { pots } = data;
  const potsTyped: EPPot[] = pots as EPPot[];
  return (
    <>
      <div className="potsPage" data-testid="pots-page">
        <HeaderBar h1Headline="Pots" buttonText="+ Add New Pot" />
        <div className="potPageGrid">
          {potsTyped.map((pot: EPPot, index: number) => (
            <PotCard key={index} pot={pot} />
          ))}
        </div>
      </div>
    </>
  );
}
