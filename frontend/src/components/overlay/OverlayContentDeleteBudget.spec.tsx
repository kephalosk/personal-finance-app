import { fireEvent, render } from '@testing-library/react';
import OverlayContentDeleteBudget from './OverlayContentDeleteBudget';

describe('OverlayContentDeleteBudget', () => {
  const mockHandleClick = jest.fn();

  const testProps = {
    handleClick: mockHandleClick,
  };

  it('renders button overlayContentDeleteBudget with correct text', () => {
    const { container } = render(<OverlayContentDeleteBudget {...testProps} />);

    const button = container.querySelector('.overlayContentDeleteBudget');

    expect(button).toBeInTheDocument();
    expect(button!.innerHTML).toEqual('Yes, Confirm Deletion');
  });

  it('calls handleCLick when button overlayContentDeleteBudget is clicked', () => {
    const { container } = render(<OverlayContentDeleteBudget {...testProps} />);

    const button = container.querySelector('.overlayContentDeleteBudget');
    fireEvent.click(button!);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
