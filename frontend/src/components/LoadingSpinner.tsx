import './LoadingSpinner.scss';
import React from 'react';

const LoadingSpinner: () => React.ReactNode = (): React.ReactNode => {
  return (
    <div className="loadingSpinnerWrapper" data-testid="loading-spinner">
      <div className="loadingSpinner"></div>
    </div>
  );
};

export default LoadingSpinner;
