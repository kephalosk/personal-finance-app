import { render, screen } from '@testing-library/react';
import OverlayDropdownIcon from './OverlayDropdownIcon';

describe('OverlayDropdownIcon', () => {
  it('renders img dropdownColorIcon', async () => {
    render(<OverlayDropdownIcon />);

    const img = await screen.findByAltText('caret icon');

    expect(img).toBeInTheDocument();
  });
});
