import { render } from '@testing-library/react';
import OverlayContentAddNewPot from './OverlayContentAddNewPot';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('OverlayContentAddNewPot', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
  });

  it('renders div overlayContentAddNewPot', () => {
    const { container: cut } = render(<OverlayContentAddNewPot />);

    const element: HTMLDivElement | null = cut.querySelector('.overlayContentAddNewPot');

    expect(element).toBeInTheDocument();
  });
});
