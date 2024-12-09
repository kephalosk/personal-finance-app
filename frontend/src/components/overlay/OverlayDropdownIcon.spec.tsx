import { render, screen } from '@testing-library/react';
import OverlayDropdownIcon from './OverlayDropdownIcon';

describe('OverlayDropdownIcon', () => {
  it('renders img dropdownColorIcon', () => {
    render(<OverlayDropdownIcon />);

    const img = screen.getByTestId('dropdown-color-icon');

    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('dropdownColorIcon');
    expect(img).toHaveAttribute('src', '/images/icon-caret-down.svg');
    expect(img).toHaveAttribute('alt', 'caret icon');
    expect(img).toHaveAttribute('aria-hidden', 'true');
  });
});
