import React, { Fragment, ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PotCardButtons from './PotCardButtons';
import { EPPot } from '../../model/entrypoints/EPPot';
import { mockedPot } from '../../fixtures/MockedPots';
import OverlayCardBox from '../overlay/OverlayCardBox';
import { updatePotTotal } from '../../globals/services/PotService';
import PotProgressForm from './potprogress/PotProgressForm';

jest.mock(
  '../overlay/OverlayCardBox',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div
            data-testid="overlay-card-box"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
              if (e.target === e.currentTarget) {
                if (props.handleEvent) props.handleEvent();
              }
            }}
          >
            {props.children}
          </div>
          <div
            data-testid="overlay-card-box-close"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
              if (e.target === e.currentTarget) {
                if (props.onClose) props.onClose();
              }
            }}
          ></div>
        </Fragment>
      )
    )
);
const newInputMoney: number = 100;
const newInputMoneyHigh: number = 3000;
const newInputMoneyInvalid: number = 0;
jest.mock(
  './potprogress/PotProgressForm',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div
            data-testid="pot-progress-form"
            onClick={() => props.handleInputChange(newInputMoney)}
          ></div>
          <div
            data-testid="pot-progress-form-high"
            onClick={() => props.handleInputChange(newInputMoneyHigh)}
          ></div>
          <div
            data-testid="pot-progress-form-invalid"
            onClick={() => props.handleInputChange(newInputMoneyInvalid)}
          ></div>
        </Fragment>
      )
    )
);

jest.mock(
  '../../globals/services/PotService',
  (): {
    __esModule: boolean;
    updatePotTotal: jest.Mock;
  } => ({
    __esModule: true,
    updatePotTotal: jest.fn(),
  })
);

describe('PotCardButtons', (): void => {
  const pot: EPPot = mockedPot;
  const mockUpdatePage: jest.Mock = jest.fn();

  const testProps: {
    pot: EPPot;
    updatePage: () => Promise<void>;
  } = {
    pot,
    updatePage: mockUpdatePage,
  };

  const titleAdd: string = `Add to „${pot.name}“`;
  const titleWithdraw: string = `Withdraw from „${pot.name}“`;

  const descriptionAdd: string =
    'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.';
  const descriptionWithdraw: string =
    'Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.';

  const submitTextAdd: string = 'Confirm Addition';
  const submitTextWithdraw: string = 'Confirm Withdrawal';

  beforeEach(() => {
    (updatePotTotal as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders div potCardButtons', (): void => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.potCardButtons');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardButtonAdd with correct text', (): void => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.add');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('+ Add Money');
  });

  it('renders div potCardButtonWithdraw with correct text', () => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.withdraw');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Withdraw');
  });

  it('renders component OverlayCardBox for Addition when potCardButtonAdd is clicked', (): void => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.add');
    fireEvent.click(htmlElement!);

    const component: HTMLElement = screen.getByTestId('overlay-card-box');

    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      {
        children: expect.any(Object),
        description: descriptionAdd,
        handleEvent: expect.any(Function),
        isHidden: false,
        onClose: expect.any(Function),
        submitText: submitTextAdd,
        title: titleAdd,
      },
      {}
    );
  });

  it('renders component OverlayCardBox for Withdrawal when potCardButtonWithdraw is clicked', (): void => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.withdraw');
    fireEvent.click(htmlElement!);

    const component: HTMLElement = screen.getByTestId('overlay-card-box');

    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      {
        children: expect.any(Object),
        description: descriptionWithdraw,
        handleEvent: expect.any(Function),
        isHidden: false,
        onClose: expect.any(Function),
        submitText: submitTextWithdraw,
        title: titleWithdraw,
      },
      {}
    );
  });

  it('handles handleEvent of component OverlayCardBox when inputAmount === 0', async (): Promise<void> => {
    render(<PotCardButtons {...testProps} />);

    const htmlElements: HTMLElement[] = screen.getAllByTestId('overlay-card-box');
    fireEvent.click(htmlElements[0]);

    expect(updatePotTotal).not.toHaveBeenCalled();
  });

  it('handles handleEvent of component OverlayCardBox when isAddition === true and calls updatePage', async (): Promise<void> => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const button: HTMLElement | null = container.querySelector('.add');
    fireEvent.click(button!);

    const form: HTMLElement = screen.getByTestId('pot-progress-form');
    fireEvent.click(form);

    const htmlElements: HTMLElement[] = screen.getAllByTestId('overlay-card-box');
    fireEvent.click(htmlElements[0]);

    expect(updatePotTotal).toHaveBeenCalledWith({
      ...pot,
      total: pot.total + newInputMoney,
    });
  });

  it('calls updatePage and closes Form when handleEvent of component OverlayCardBox is triggered successfully', async (): Promise<void> => {
    render(<PotCardButtons {...testProps} />);

    const form: HTMLElement = screen.getByTestId('pot-progress-form');
    fireEvent.click(form);
    const htmlElements: HTMLElement[] = screen.getAllByTestId('overlay-card-box');
    fireEvent.click(htmlElements[0]);

    expect(updatePotTotal).toHaveBeenCalledWith({
      ...pot,
      total: pot.total + newInputMoney,
    });
    await waitFor(() => expect(mockUpdatePage).toHaveBeenCalled());
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isHidden: true,
      }),
      {}
    );
  });

  it('handles handleEvent of component OverlayCardBox when isAddition === false', async (): Promise<void> => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const button: HTMLElement | null = container.querySelector('.withdraw');
    fireEvent.click(button!);

    const form: HTMLElement = screen.getByTestId('pot-progress-form');
    fireEvent.click(form);

    const htmlElements: HTMLElement[] = screen.getAllByTestId('overlay-card-box');
    fireEvent.click(htmlElements[0]);

    expect(updatePotTotal).toHaveBeenCalledWith({
      ...pot,
      total: pot.total - newInputMoney,
    });
  });

  it('handles handleEvent of component OverlayCardBox when new total is less than 0', async (): Promise<void> => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const button: HTMLElement | null = container.querySelector('.withdraw');
    fireEvent.click(button!);

    const form: HTMLElement = screen.getByTestId('pot-progress-form-high');
    fireEvent.click(form);

    const htmlElements: HTMLElement[] = screen.getAllByTestId('overlay-card-box');
    fireEvent.click(htmlElements[0]);

    expect(updatePotTotal).toHaveBeenCalledWith({
      ...pot,
      total: 0,
    });
  });

  it('renders component PotProgressForm for Addition when potCardButtonAdd is clicked', (): void => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.add');
    fireEvent.click(htmlElement!);

    const component: HTMLElement = screen.getByTestId('pot-progress-form');

    expect(component).toBeInTheDocument();
    expect(PotProgressForm).toHaveBeenLastCalledWith(
      {
        handleInputChange: expect.any(Function),
        hasValidInput: true,
        inputAmount: 0,
        isAddition: true,
        isHidden: false,
        pot: mockedPot,
      },
      {}
    );
  });

  it('renders component PotProgressForm for Withdrawal when potCardButtonWithdraw is clicked', (): void => {
    const { container } = render(<PotCardButtons {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.withdraw');
    fireEvent.click(htmlElement!);

    const component: HTMLElement = screen.getByTestId('pot-progress-form');

    expect(component).toBeInTheDocument();
    expect(PotProgressForm).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isAddition: false,
      }),
      {}
    );
  });

  it('handles handleInputChange of component PotProgressForm when input greater 0', async (): Promise<void> => {
    render(<PotCardButtons {...testProps} />);
    expect(PotProgressForm).toHaveBeenLastCalledWith(
      expect.objectContaining({
        inputAmount: 0,
        hasValidInput: true,
      }),
      {}
    );

    const form: HTMLElement = screen.getByTestId('pot-progress-form');
    fireEvent.click(form);

    expect(PotProgressForm).toHaveBeenLastCalledWith(
      expect.objectContaining({
        inputAmount: 100,
        hasValidInput: true,
      }),
      {}
    );
  });

  it('handles handleInputChange of component PotProgressForm when input is 0', async (): Promise<void> => {
    render(<PotCardButtons {...testProps} />);
    expect(PotProgressForm).toHaveBeenLastCalledWith(
      expect.objectContaining({
        inputAmount: 0,
        hasValidInput: true,
      }),
      {}
    );

    const form: HTMLElement = screen.getByTestId('pot-progress-form-invalid');
    fireEvent.click(form);

    expect(PotProgressForm).toHaveBeenLastCalledWith(
      expect.objectContaining({
        inputAmount: 0,
        hasValidInput: false,
      }),
      {}
    );
  });
});
