import './NoPage.scss';
import React from 'react';

const NoPage: () => React.ReactNode = (): React.ReactNode => {
  const msgNotFound: string = "The page you are looking for doesn't exist.";
  return (
    <>
      <div className="noPage" data-testid="no-page">
        <h1>404 - Page Not Found</h1>
        <p>{msgNotFound}</p>
      </div>
    </>
  );
};

export default NoPage;
