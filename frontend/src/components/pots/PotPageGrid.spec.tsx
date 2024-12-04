import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { mockedPots } from '../../fixtures/MockedPots';
import { getPots } from '../../globals/services/PotService';
import { MemoryRouter } from 'react-router-dom';
import PotPageGrid from './PotPageGrid';
import { ReactFutureFlags } from '../../constants/ReactFutureFlags';
import { PotCard } from './PotCard';

jest.mock('./PotCard', () => ({ PotCard: jest.fn(() => <div data-testid="pot-card"></div>) }));

jest.mock('../../globals/services/PotService', () => ({
  getPots: jest.fn(),
}));

describe('PotPageGrid', () => {
  const pots = mockedPots;
  const isLoading = false;
  const testProps = {
    pots,
    isLoading,
  };

  beforeEach(() => {
    (getPots as jest.Mock).mockResolvedValue(mockedPots);
  });

  it('renders div potPageGrid', async () => {
    const cut = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<PotPageGrid {...testProps} />);
      return container;
    });

    const htmlElement = cut.querySelector('.potPageGrid');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders components PotCard with passed prop pots', async () => {
    await act(async (): Promise<void> => {
      render(<PotPageGrid {...testProps} />);
    });

    const components = screen.getAllByTestId('pot-card');

    expect(components).toHaveLength(4);
    mockedPots.forEach((pot, index) => {
      expect(PotCard).toHaveBeenNthCalledWith(
        index + 1,
        {
          isLoading: false,
          pot: {
            color: pot.color,
            name: pot.name,
            target: pot.target,
            total: pot.total,
          },
        },
        {}
      );
    });
  });

  it('renders LoadingSpinner if prop isLoading is true', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <PotPageGrid {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.loadingSpinner');
    const components = screen.queryAllByTestId('value-box');

    expect(htmlElement).toBeInTheDocument();
    expect(components).toHaveLength(0);
  });
});
