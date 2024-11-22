import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders div loadingSpinnerWrapper', () => {
    const { container } = render(<LoadingSpinner />);

    const htmlElement = container.querySelector('.loadingSpinnerWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div loadingSpinner', () => {
    const { container } = render(<LoadingSpinner />);

    const htmlElement = container.querySelector('.loadingSpinner');

    expect(htmlElement).toBeInTheDocument();
  });
});
