import { render, screen } from '@testing-library/react';
import { PotsPage } from './PotsPage';
import { getPots } from '../globals/services/PotService';
import { mockedPots } from '../fixtures/MockedPots';
import { act } from 'react';

jest.mock('../globals/services/PotService', () => ({
  getPots: jest.fn(),
}));

describe('PotsPage', () => {
  beforeEach(() => {
    (getPots as jest.Mock).mockResolvedValue(mockedPots);
  });

  it('renders component HeaderBar', async () => {
    await act(async (): Promise<void> => {
      render(<PotsPage />);
    });

    const htmlElement = screen.getByTestId('header-bar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component PotPageGrid', async () => {
    await act(async (): Promise<HTMLElement> => {
      const { container } = render(<PotsPage />);
      return container;
    });

    const htmlElement = screen.getByTestId('pot-page-grid');

    expect(htmlElement).toBeInTheDocument();
  });
});
