import './Showcase.scss';
import { Link } from 'react-router-dom';
import ShowcaseWrapper from './ShowcaseWrapper';

const Showcase = () => {
  return (
    <ShowcaseWrapper>
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
          <Link className="showcaseContentLink" to={'/showcase/AddNewPotForm'}>
            AddNewPotForm
          </Link>
          <Link className="showcaseContentLink" to={'/showcase/EditPotForm'}>
            EditPotForm
          </Link>
          <Link className="showcaseContentLink" to={'/showcase/DeletePotForm'}>
            DeletePotForm
          </Link>
        </div>
      </div>
    </ShowcaseWrapper>
  );
};

export default Showcase;
