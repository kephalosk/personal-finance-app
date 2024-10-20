import './OverviewHeader.scss';
import PropTypes from 'prop-types';
import { OverviewHeaderProps } from '../../types/OverviewHeaderProps';
import { Link } from 'react-router-dom';

OverviewHeader.propTypes = {
  title: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkTarget: PropTypes.string.isRequired,
};

export function OverviewHeader({ title, linkText, linkTarget }: OverviewHeaderProps) {
  return (
    <>
      <div className="overviewHeader" data-testid="overview-header">
        <h2 className="overviewHeaderTitle">{title}</h2>
        <Link to={linkTarget} className="overviewHeaderLink">
          {linkText}
          <svg
            width="5"
            height="10"
            viewBox="0 0 5 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.765312 0.984685L4.51531 4.73469C4.55018 4.76951 4.57784 4.81087 4.59671 4.8564C4.61558 4.90192 4.62529 4.95072 4.62529 5C4.62529 5.04928 4.61558 5.09808 4.59671 5.1436C4.57784 5.18912 4.55018 5.23048 4.51531 5.26531L0.765313 9.01531C0.712867 9.06782 0.646022 9.10358 0.57324 9.11807C0.500458 9.13257 0.425012 9.12514 0.356454 9.09673C0.287895 9.06832 0.229307 9.02021 0.188105 8.95849C0.146903 8.89677 0.124942 8.82421 0.125 8.75L0.125 1.25C0.124941 1.17579 0.146903 1.10323 0.188105 1.0415C0.229306 0.979781 0.287895 0.931672 0.356453 0.903265C0.425012 0.874857 0.500458 0.867431 0.57324 0.881925C0.646022 0.896419 0.712867 0.93218 0.765312 0.984685Z"
              fill="#696868"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
