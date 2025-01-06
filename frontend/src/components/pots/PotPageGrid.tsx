import './PotPageGrid.scss';
import { EPPot } from '../../model/entrypoints/EPPot';
import PotCard from './PotCard';
import LoadingSpinner from '../LoadingSpinner';
import React from 'react';

interface Props {
  pots: EPPot[];
  updatePage: () => Promise<void>;
  isLoading: boolean;
}

const PotPageGrid: ({ pots, updatePage, isLoading }: Props) => React.ReactNode = ({
  pots,
  updatePage,
  isLoading,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="potPageGrid" data-testid="pot-page-grid">
          {pots.map((pot: EPPot, index: number) => (
            <PotCard
              key={index}
              pots={pots}
              pot={pot}
              isLoading={isLoading}
              updatePage={updatePage}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PotPageGrid;
