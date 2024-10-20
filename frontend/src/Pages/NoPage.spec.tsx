import { render } from '@testing-library/react';
import { NoPage } from './NoPage';

describe('NoPage', () => {
  it('renders div noPage', () => {
    const { container } = render(<NoPage />);

    const htmlElement = container.querySelector('.noPage');

    expect(htmlElement).toBeInTheDocument();
  });
});
