import { render } from '@testing-library/react';
import { PotsPage } from './PotsPage';

describe('PotsPage', () => {
  it('renders div potsPage', () => {
    const { container } = render(<PotsPage />);

    const htmlElement = container.querySelector('.potsPage');

    expect(htmlElement).toBeInTheDocument();
  });
});
