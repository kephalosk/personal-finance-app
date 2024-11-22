import { render, screen } from '@testing-library/react';
import { OverviewPots } from './OverviewPots';
import { MemoryRouter } from 'react-router-dom';
import { mockedPot, mockedPots } from '../../../fixtures/MockedPots';

describe('OverviewPots', () => {
  const pots = mockedPots;
  const isLoading = false;
  const testProps = {
    pots,
    isLoading,
  };
  it('renders div overviewPots', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewPots {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewPots');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(
      <MemoryRouter>
        <OverviewPots {...testProps} />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewPotsContent', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewPots {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewPotsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component PotsSummary', () => {
    render(
      <MemoryRouter>
        <OverviewPots {...testProps} />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('pots-summary');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewPotsValues', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewPots {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewPotsValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders 2 divs overviewPotsValuesRow', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewPots {...testProps} />
      </MemoryRouter>
    );

    const htmlElements = container.querySelectorAll('.overviewPotsValuesRow');

    expect(htmlElements).toHaveLength(2);
  });

  it('renders react component ValueBox 4 times with passed pots', () => {
    render(
      <MemoryRouter>
        <OverviewPots {...testProps} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(4);
  });

  it('renders react component ValueBox only 1 time if only 1 pot is passed', () => {
    render(
      <MemoryRouter>
        <OverviewPots {...testProps} pots={[mockedPot]} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(1);
  });

  it('renders LoadingSpinner if isLoading is true', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewPots {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.loadingSpinner');
    const components = screen.queryAllByTestId('value-box');

    expect(htmlElement).toBeInTheDocument();
    expect(components).toHaveLength(0);
  });
});
