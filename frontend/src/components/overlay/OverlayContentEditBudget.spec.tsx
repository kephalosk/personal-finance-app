import { render } from '@testing-library/react';
import OverlayContentEditBudget from './OverlayContentEditBudget';

describe('OverlayContentEditBudget', () => {
  it('renders div overlayContentEditBudget', () => {
    const { container } = render(<OverlayContentEditBudget />);

    const element = container.querySelector('.overlayContentEditBudget');

    expect(element).toBeInTheDocument();
  });
});
