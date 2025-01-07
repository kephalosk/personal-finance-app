import { fireEvent, render } from '@testing-library/react';
import OverlayContentDeletePot from './OverlayContentDeletePot';

describe('OverlayContentDeletePot', () => {
  const mockHandleClick: jest.Mock = jest.fn();

  const testProps: {
    handleClick: () => void;
  } = {
    handleClick: mockHandleClick,
  };

  it('renders button overlayContentDeletePot with correct text', (): void => {
    const { container } = render(<OverlayContentDeletePot {...testProps} />);

    const button: HTMLButtonElement | null = container.querySelector('.overlayContentDeletePot');

    expect(button).toBeInTheDocument();
    expect(button!.innerHTML).toEqual('Yes, Confirm Deletion');
  });

  it('calls handleCLick when button overlayContentDeleteBudget is clicked', (): void => {
    const { container } = render(<OverlayContentDeletePot {...testProps} />);

    const button: HTMLButtonElement | null = container.querySelector('.overlayContentDeletePot');
    fireEvent.click(button!);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
