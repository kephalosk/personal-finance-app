import { render, screen } from '@testing-library/react';
import OverviewPots from './OverviewPots';
import { mockedPot, mockedPots } from '../../../fixtures/MockedPots';
import getTotalPotSum from '../../../globals/utils/getTotalPotSum';
import OverviewHeader from '../OverviewHeader';
import LoadingSpinner from '../../LoadingSpinner';
import PotsSummary from './PotsSummary';
import ValueBox from '../ValueBox';

jest.mock('../../../globals/utils/getTotalPotSum', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../OverviewHeader', () => jest.fn(() => <div data-testid="overview-header"></div>));
jest.mock('../../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));
jest.mock('./PotsSummary', () => jest.fn(() => <div data-testid="pots-summary"></div>));
jest.mock('../ValueBox', () => jest.fn(() => <div data-testid="value-box"></div>));

describe('OverviewPots', () => {
  const pots = mockedPots;
  const isLoading = false;

  const testProps = {
    pots,
    isLoading,
  };

  const testPotSum = 123;

  beforeEach(() => {
    (getTotalPotSum as jest.Mock).mockReturnValue(testPotSum);
  });

  it('renders div overviewPots', () => {
    const { container } = render(<OverviewPots {...testProps} />);

    const htmlElement = container.querySelector('.overviewPots');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component OverviewHeader', () => {
    render(<OverviewPots {...testProps} />);

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
    expect(OverviewHeader).toHaveBeenCalledWith(
      { linkTarget: '/pots', linkText: 'See Details', title: 'Pots' },
      {}
    );
  });

  it('renders component LoadingSpinner when passed prop isLoading is true', () => {
    render(<OverviewPots {...testProps} isLoading={true} />);

    const reactComponent = screen.getByTestId('loading-spinner');

    expect(reactComponent).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner when passed prop isLoading is false', () => {
    render(<OverviewPots {...testProps} isLoading={false} />);

    const reactComponent = screen.queryByTestId('loading-spinner');

    expect(reactComponent).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div overviewPotsContent', () => {
    const { container } = render(<OverviewPots {...testProps} />);

    const htmlElement = container.querySelector('.overviewPotsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component PotsSummary', () => {
    render(<OverviewPots {...testProps} />);

    const reactComponent = screen.getByTestId('pots-summary');

    expect(reactComponent).toBeInTheDocument();
    expect(PotsSummary).toHaveBeenCalledWith({ potSum: testPotSum }, {});
  });

  it('renders div overviewPotsValues', () => {
    const { container } = render(<OverviewPots {...testProps} />);

    const htmlElement = container.querySelector('.overviewPotsValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders 2 divs overviewPotsValuesRow', () => {
    const { container } = render(<OverviewPots {...testProps} />);

    const htmlElements = container.querySelectorAll('.overviewPotsValuesRow');

    expect(htmlElements).toHaveLength(2);
  });

  it('renders react component ValueBox 4 times with passed pots', () => {
    render(<OverviewPots {...testProps} />);

    const components = screen.getAllByTestId('value-box');

    expect(components).toHaveLength(4);
    mockedPots.forEach((pot, index) => {
      expect(ValueBox).toHaveBeenNthCalledWith(
        index + 1,
        {
          title: pot.name,
          value: pot.total,
          color: pot.color,
        },
        {}
      );
    });
  });

  it('renders react component ValueBox only 1 time if only 1 pot is passed', () => {
    render(<OverviewPots {...testProps} pots={[mockedPot]} />);

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(1);
    expect(ValueBox).toHaveBeenCalledWith(
      {
        title: mockedPot.name,
        value: mockedPot.total,
        color: mockedPot.color,
      },
      {}
    );
  });
});
