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

  it('renders div potPageGrid', async () => {
    const cut = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<PotsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.potPageGrid');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders components PotCard', async () => {
    await act(async (): Promise<void> => {
      render(<PotsPage />);
    });

    const components = screen.getAllByTestId('pot-card');

    expect(components).toHaveLength(4);
  });
});
