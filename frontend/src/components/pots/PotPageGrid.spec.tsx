import { fireEvent, render, screen } from '@testing-library/react';
import { mockedPots } from '../../fixtures/MockedPots';
import { getPots } from '../../globals/services/PotService';
import PotPageGrid from './PotPageGrid';
import PotCard from './PotCard';
import LoadingSpinner from '../LoadingSpinner';
import { EPPot } from '../../model/entrypoints/EPPot';

jest.mock('./PotCard', () =>
  jest.fn((props) => <div data-testid="pot-card" onClick={() => props.updatePage()}></div>)
);
jest.mock('../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));

jest.mock('../../globals/services/PotService', () => ({
  getPots: jest.fn(),
}));

describe('PotPageGrid', () => {
  const pots: EPPot[] = mockedPots;
  const mockUpdatePage: () => Promise<void> = jest.fn();
  const isLoading: boolean = false;

  const testProps: {
    pots: EPPot[];
    updatePage: () => Promise<void>;
    isLoading: boolean;
  } = {
    pots,
    updatePage: mockUpdatePage,
    isLoading,
  };

  beforeEach((): void => {
    (getPots as jest.Mock).mockResolvedValue(mockedPots);
  });

  it('renders div potPageGrid', async (): Promise<void> => {
    const { container } = render(<PotPageGrid {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.potPageGrid');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders components PotCard with passed prop pots', async (): Promise<void> => {
    render(<PotPageGrid {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('pot-card');

    expect(components).toHaveLength(4);
    mockedPots.forEach((pot: EPPot, index: number): void => {
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
          pots,
          updatePage: expect.any(Function),
        },
        {}
      );
    });
  });

  it('renders LoadingSpinner if passed prop isLoading is true', (): void => {
    render(<PotPageGrid {...testProps} isLoading={true} />);

    const spinner: HTMLElement = screen.getByTestId('loading-spinner');
    const components: HTMLElement[] = screen.queryAllByTestId('pot-card');

    expect(spinner).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
    expect(components).toHaveLength(0);
  });

  it('does not render LoadingSpinner if passed prop isLoading is false', (): void => {
    render(<PotPageGrid {...testProps} isLoading={false} />);

    const spinner: HTMLElement | null = screen.queryByTestId('loading-spinner');
    const components: HTMLElement[] = screen.queryAllByTestId('pot-card');

    expect(spinner).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
    expect(components).toHaveLength(4);
  });

  it('passes updatePage of components PotCard to parent', async (): Promise<void> => {
    render(<PotPageGrid {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('pot-card');
    fireEvent.click(components[0]);

    expect(mockUpdatePage).toHaveBeenCalled();
  });
});
