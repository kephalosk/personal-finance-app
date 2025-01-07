import { fireEvent, render, screen } from '@testing-library/react';
import { mockedPot, mockedPots } from '../../fixtures/MockedPots';
import PotCard from './PotCard';
import LoadingSpinner from '../LoadingSpinner';
import CardHeader from '../CardHeader';
import PotCardDetails from './PotCardDetails';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { EPPot } from '../../model/entrypoints/EPPot';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';
import React, { Fragment, ReactNode } from 'react';
import { Color } from '../../model/Color';
import Colors from '../../constants/Colors';
import OverlayCardBox from '../overlay/OverlayCardBox';
import OverlayContentEditPot from '../overlay/OverlayContentEditPot';
import { editPot } from '../../globals/services/PotService';

jest.mock(
  '../LoadingSpinner',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="loading-spinner"></div>)
);
jest.mock(
  '../CardHeader',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div
            data-testid="card-header"
            onClick={() => props.handleSelection(CardHeaderItemOperationEnum.EDIT)}
          ></div>
          <div
            data-testid="card-header-delete"
            onClick={() => props.handleSelection(CardHeaderItemOperationEnum.DELETE)}
          ></div>
        </Fragment>
      )
    )
);
jest.mock(
  './PotCardDetails',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="pot-card-details"></div>)
);
jest.mock(
  '../overlay/OverlayCardBox',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div data-testid="overlay-card-box" onClick={(): void => props.handleEvent()}>
            {props.children}
          </div>
          <div
            data-testid="overlay-card-box-close-form"
            onClick={(): void => props.onClose()}
          ></div>
        </Fragment>
      )
    )
);
const newInputPotName: string = 'island';
const newInputPotNameInvalid: string = '';
const newColor: Color = Colors[1];
const newInputMoney: number = 300000;
const newInputMoneyInvalid: number = 0;
jest.mock(
  '../overlay/OverlayContentEditPot',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div
            data-testid="overlay-content-edit-pot"
            onClick={(event) => {
              event.stopPropagation();
              props.handleNameInputChange(newInputPotName);
            }}
          ></div>
          <div
            data-testid="overlay-content-edit-pot-invalid"
            onClick={(event) => {
              event.stopPropagation();
              props.handleNameInputChange(newInputPotNameInvalid);
            }}
          ></div>
          <div
            data-testid="overlay-content-edit-pot-taken"
            onClick={(event) => {
              event.stopPropagation();
              props.handleNameInputChange(mockedPots[1].name);
            }}
          ></div>
          <div
            data-testid="overlay-content-edit-pot-color"
            onClick={(event) => {
              event.stopPropagation();
              props.propagateColorChange(newColor);
            }}
          ></div>
          <div
            data-testid="overlay-content-edit-pot-money"
            onClick={(event) => {
              event.stopPropagation();
              props.handleTargetInputChange(newInputMoney);
            }}
          ></div>
          <div
            data-testid="overlay-content-edit-pot-money-invalid"
            onClick={(event) => {
              event.stopPropagation();
              props.handleTargetInputChange(newInputMoneyInvalid);
            }}
          ></div>
        </Fragment>
      )
    )
);

jest.mock('../../globals/services/PotService', () => ({
  getPots: jest.fn(),
  editPot: jest.fn(),
}));

describe('PotCard', () => {
  const pots: EPPot[] = mockedPots;
  const pot: EPPot = mockedPot;
  const mockUpdatePage: () => Promise<void> = jest.fn();
  const isLoading: boolean = false;

  const testProps: {
    pots: EPPot[];
    pot: EPPot;
    updatePage: () => Promise<void>;
    isLoading: boolean;
  } = {
    pots,
    pot,
    updatePage: mockUpdatePage,
    isLoading,
  };

  beforeEach(() => {
    (editPot as jest.Mock).mockResolvedValue(undefined);
  });

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

  it('handels edit selection of CardHeader', () => {
    render(<PotCard {...testProps} />);
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: true }),
      {}
    );

    const component: HTMLElement = screen.getByTestId('card-header');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: false }),
      {}
    );
  });

  it('handels delete selection of CardHeader', () => {
    render(<PotCard {...testProps} />);

    const component: HTMLElement = screen.getByTestId('card-header-delete');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    //TODO fe-28-delete-pot: check outcome of handleSelection
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

  it('renders component OverlayCardBox', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenCalledWith(
      {
        children: expect.any(Object),
        description: 'If your saving targets change, feel free to update your pots.',
        handleEvent: expect.any(Function),
        isHidden: true,
        onClose: expect.any(Function),
        submitText: 'Save Changes',
        title: 'Edit Pot',
      },
      {}
    );
  });

  it('handles handleEvent of component OverlayCardBox', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(htmlElement);

    expect(editPot).toHaveBeenCalledWith({
      ...pot,
      oldName: pot.name,
    });
  });

  it('handles handleEvent of component OverlayCardBox if potName is empty', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const htmlName: HTMLElement = screen.getByTestId('overlay-content-edit-pot-invalid');
    fireEvent.click(htmlName);
    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(htmlElement);

    expect(editPot).not.toHaveBeenCalled();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidNameInput: false,
      }),
      {}
    );
  });

  it('handles handleEvent of component OverlayCardBox if potName is taken', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const inputName: HTMLElement = screen.getAllByTestId('overlay-content-edit-pot-taken')[0];
    fireEvent.click(inputName);
    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(htmlElement);

    expect(editPot).not.toHaveBeenCalled();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidNameInput: false,
      }),
      {}
    );
  });

  it('handles handleEvent of component OverlayCardBox if potAmount is 0', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const inputName: HTMLElement = screen.getAllByTestId(
      'overlay-content-edit-pot-money-invalid'
    )[0];
    fireEvent.click(inputName);
    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(htmlElement);

    expect(editPot).not.toHaveBeenCalled();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidTargetInput: false,
      }),
      {}
    );
  });

  it('handles onClose of component OverlayCardBox', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const headerBar: HTMLElement = screen.getByTestId('card-header');
    fireEvent.click(headerBar!);
    const component: HTMLElement = screen.getByTestId('overlay-card-box');
    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: false }),
      {}
    );

    const cardBox: HTMLElement = screen.getByTestId('overlay-card-box-close-form');
    fireEvent.click(cardBox!);

    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: true }),
      {}
    );
  });

  it('renders component OverlayContentEditPot', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-edit-pot')[0];

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentEditPot).toHaveBeenCalledWith(
      {
        pot: mockedPot,
        hasValidNameInput: true,
        handleNameInputChange: expect.any(Function),
        hasValidTargetInput: true,
        handleTargetInputChange: expect.any(Function),
        isHidden: true,
        propagateColorChange: expect.any(Function),
        hasFormToGetAReset: false,
      },
      {}
    );
  });

  it('handles handleNameInputChange of component OverlayContentEditPot', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-edit-pot')[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidNameInput: true,
      }),
      {}
    );
  });

  it('handles empty handleNameInputChange of component OverlayContentEditPot', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-edit-pot-invalid')[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidNameInput: false,
      }),
      {}
    );
  });

  it('handles handleTargetInputChange of component OverlayContentEditPot', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-edit-pot-money')[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidTargetInput: true,
      }),
      {}
    );
  });

  it('handles empty handleTargetInputChange of component OverlayContentEditPot', async (): Promise<void> => {
    render(<PotCard {...testProps} />);

    const htmlElement: HTMLElement = screen.getAllByTestId(
      'overlay-content-edit-pot-money-invalid'
    )[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidTargetInput: false,
      }),
      {}
    );
  });

  it('handles propagateColorChange of component OverlayContentEditPot', async (): Promise<void> => {
    render(<PotCard {...testProps} />);
    const headerBar: HTMLElement = screen.getByTestId('card-header');
    fireEvent.click(headerBar);
    const component: HTMLElement = screen.getByTestId('overlay-card-box-close-form');
    fireEvent.click(component);
    expect(component).toBeInTheDocument();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasFormToGetAReset: true,
      }),
      {}
    );

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-edit-pot-color')[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentEditPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasFormToGetAReset: false,
      }),
      {}
    );
  });
});
