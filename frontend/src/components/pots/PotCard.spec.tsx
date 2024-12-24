import { fireEvent, render, screen } from '@testing-library/react';
import { mockedPot } from '../../fixtures/MockedPots';
import PotCard from './PotCard';
import LoadingSpinner from '../LoadingSpinner';
import CardHeader from '../CardHeader';
import PotCardDetails from './PotCardDetails';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { EPPot } from '../../model/entrypoints/EPPot';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';
import { ReactNode } from 'react';

jest.mock(
  '../LoadingSpinner',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="loading-spinner"></div>)
);
jest.mock(
  '../CardHeader',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div
          data-testid="card-header"
          onClick={() => props.handleSelection(CardHeaderItemOperationEnum.EDIT)}
        ></div>
      )
    )
);
jest.mock(
  './PotCardDetails',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="pot-card-details"></div>)
);

describe('PotCard', () => {
  const pot: EPPot = mockedPot;
  const isLoading: boolean = false;

  const testProps: {
    pot: EPPot;
    isLoading: boolean;
  } = {
    pot,
    isLoading,
  };

  it('renders LoadingSpinner if passed prop isLoading is true', () => {
    const { container } = render(<PotCard {...testProps} isLoading={true} />);

    const spinner: HTMLElement = screen.getByTestId('loading-spinner');
    const htmlElement: HTMLElement | null = container.querySelector('.potCard');

    expect(spinner).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
    expect(htmlElement).not.toBeInTheDocument();
  });

  it('does not render LoadingSpinner if passed prop isLoading is false', () => {
    const { container } = render(<PotCard {...testProps} isLoading={false} />);

    const spinner: HTMLElement | null = screen.queryByTestId('loading-spinner');
    const htmlElement: HTMLElement | null = container.querySelector('.potCard');

    expect(spinner).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCard', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.potCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component CardHeader', () => {
    render(<PotCard {...testProps} />);

    const component: HTMLElement = screen.getByTestId('card-header');

    expect(component).toBeInTheDocument();
    expect(CardHeader).toHaveBeenCalledWith(
      {
        color: mockedPot.color,
        title: mockedPot.name,
        itemName: CardHeaderItemNameEnum.POT,
        handleSelection: expect.any(Function),
      },
      {}
    );
  });

  it('handels selection of CardHeader', () => {
    render(<PotCard {...testProps} />);

    const component: HTMLElement = screen.getByTestId('card-header');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    //TODO fe-27-edit-pot: check outcome of handleSelection
  });

  it('renders component PotCardDetails with passed prop pot', () => {
    render(<PotCard {...testProps} />);

    const component: HTMLElement = screen.getByTestId('pot-card-details');

    expect(component).toBeInTheDocument();
    expect(PotCardDetails).toHaveBeenCalledWith({ pot }, {});
  });

  it('renders div potCardButtons', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.potCardButtons');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardButtonAdd with correct text', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.add');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('+ Add Money');
  });

  it('renders div potCardButtonWithdraw with correct text', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.withdraw');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Withdraw');
  });
});
