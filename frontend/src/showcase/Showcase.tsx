import './Showcase.scss';
import { Link } from 'react-router-dom';

const Showcase = () => {
  return (
    <>
      <div className="showcase">
        <h1 className="showcaseHeadline">Showcase</h1>
        <div className="showcaseContent">
          <Link className="showcaseContentLink" to={'/showcase/AddNewBudgetForm'}>
            AddNewBudgetForm
          </Link>
          <Link className="showcaseContentLink" to={'/showcase/DeleteBudgetForm'}>
            DeleteBudgetForm
          </Link>
          <Link className="showcaseContentLink" to={'/showcase/EditBudgetForm'}>
            EditBudgetForm
          </Link>
        </div>
      </div>
    </>
  );
};

export default Showcase;
