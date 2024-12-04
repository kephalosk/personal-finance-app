import './PotPageGrid.scss';
import { EPPot } from '../../model/entrypoints/EPPot';
import { PotCard } from './PotCard';
import LoadingSpinner from '../LoadingSpinner';
import React from 'react';

interface Props {
  pots: EPPot[];
  isLoading: boolean;
}

const PotPageGrid: ({ pots, isLoading }: Props) => React.ReactNode = ({
  pots,
  isLoading,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="potPageGrid" data-testid="pot-page-grid">
          {pots.map((pot: EPPot, index: number) => (
            <PotCard key={index} pot={pot} isLoading={isLoading} />
          ))}
        </div>
      )}
    </>
  );
};

export default PotPageGrid;
