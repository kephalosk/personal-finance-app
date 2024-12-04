import './NoPage.scss';

const NoPage = () => {
  const msgNotFound = "The page you are looking for doesn't exist.";
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
