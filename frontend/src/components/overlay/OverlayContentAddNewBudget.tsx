import './OverlayContentAddNewBudget.scss';
import React from 'react';

const OverlayContentAddNewBudget = () => {
  return (
    <>
      {' '}
      <label className="fieldTitle">Budget Category</label>
      <div className="dropdownCategory" tabIndex={0}>
        Entertainment
        <img
          className="dropdownCategoryIcon"
          alt="caret icon"
          aria-hidden="true"
          src="/images/icon-caret-down.svg"
        />
        <div className="dropdownCategoryList" tabIndex={0}>
          Entertainment
        </div>
      </div>
      <label className="fieldTitle">Maximum Spend</label>
      <input className="inputMoney" />
      <label className="fieldTitle">Theme</label>
      <div className="dropdownColor" tabIndex={0}>
        <div className="dropdownColorCircle"></div>
        Green
        <img
          className="dropdownCategoryIcon"
          alt="caret icon"
          aria-hidden="true"
          src="/images/icon-caret-down.svg"
        />
      </div>
    </>
  );
};

export default OverlayContentAddNewBudget;
