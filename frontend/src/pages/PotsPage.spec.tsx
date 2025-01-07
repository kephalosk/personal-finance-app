import { fireEvent, render, screen } from '@testing-library/react';
import PotsPage from './PotsPage';
import { addNewPot, getPots } from '../globals/services/PotService';
import { mockedPots } from '../fixtures/MockedPots';
import React, { act, Fragment, ReactNode } from 'react';
import HeaderBar from '../components/HeaderBar';
import PotPageGrid from '../components/pots/PotPageGrid';
import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentAddNewPot from '../components/overlay/OverlayContentAddNewPot';
import Colors from '../constants/Colors';
import { Color } from '../model/Color';

jest.mock(
  '../components/HeaderBar',
  (): jest.Mock =>
    jest.fn((props): ReactNode => <div data-testid="header-bar" onClick={props.handleClick}></div>)
);
jest.mock(
  '../components/pots/PotPageGrid',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div data-testid="pot-page-grid" onClick={() => props.updatePage()}></div>
      )
    )
);
jest.mock(
  '../components/overlay/OverlayCardBox',
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
          >
            {props.children}
          </div>
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
  '../components/overlay/OverlayContentAddNewPot',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div
            data-testid="overlay-content-add-new-pot"
            onClick={() => props.handleNameInputChange(newInputPotName)}
          ></div>
          <div
            data-testid="overlay-content-add-new-pot-invalid"
            onClick={() => props.handleNameInputChange(newInputPotNameInvalid)}
          ></div>
          <div
            data-testid="overlay-content-add-new-pot-taken"
            onClick={() => props.handleNameInputChange(mockedPots[0].name)}
          ></div>
          <div
            data-testid="overlay-content-add-new-pot-color"
            onClick={() => props.handleColorChange(newColor)}
          ></div>
          <div
            data-testid="overlay-content-add-new-pot-money"
            onClick={() => props.handleTargetInputChange(newInputMoney)}
          ></div>
          <div
            data-testid="overlay-content-add-new-pot-money-invalid"
            onClick={() => props.handleTargetInputChange(newInputMoneyInvalid)}
          ></div>
        </Fragment>
      )
    )
);

jest.mock(
  '../globals/services/PotService',
  (): {
    getPots: jest.Mock;
    addNewPot: jest.Mock;
  } => ({
    getPots: jest.fn(),
    addNewPot: jest.fn(),
  })
);

describe('PotsPage', (): void => {
  const triggerAddNewPot = (): void => {
    const headerBar: HTMLElement = screen.getByTestId('header-bar');
    fireEvent.click(headerBar);
    const inputName: HTMLElement = screen.getAllByTestId('overlay-content-add-new-pot')[0];
    fireEvent.click(inputName);
    const inputMoney: HTMLElement = screen.getAllByTestId('overlay-content-add-new-pot-money')[0];
    fireEvent.click(inputMoney);
    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(htmlElement);
  };

  beforeEach((): void => {
    (getPots as jest.Mock).mockResolvedValue(mockedPots);
    (addNewPot as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders div potsPage', async (): Promise<void> => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<PotsPage />);
      return container;
    });

    const htmlElement: HTMLElement | null = cut.querySelector('.potsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component HeaderBar', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getByTestId('header-bar');

    expect(htmlElement).toBeInTheDocument();
    expect(HeaderBar).toHaveBeenLastCalledWith(
      { buttonText: '+ Add New Pot', h1Headline: 'Pots', handleClick: expect.any(Function) },
      {}
    );
  });

  it('renders component PotPageGrid', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<PotsPage />);
    });

    const htmlElement: HTMLElement = screen.getByTestId('pot-page-grid');

    expect(htmlElement).toBeInTheDocument();
    expect(PotPageGrid).toHaveBeenNthCalledWith(
      1,
      { isLoading: true, pots: [], updatePage: expect.any(Function) },
      {}
    );
    expect(PotPageGrid).toHaveBeenNthCalledWith(
      2,
      { isLoading: false, pots: mockedPots, updatePage: expect.any(Function) },
      {}
    );
  });

  it('handles updatePage of component PotPageGrid', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<PotsPage />);
    });
    expect(getPots).toHaveBeenCalledTimes(1);

    const htmlElement: HTMLElement = screen.getByTestId('pot-page-grid');
    fireEvent.click(htmlElement);

    expect(getPots).toHaveBeenCalledTimes(2);
  });

  it('handles openNewPotForm', async (): Promise<void> => {
    render(<PotsPage />);

    expect(OverlayCardBox).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ isHidden: true }),
      {}
    );

    const htmlElement: HTMLElement = screen.getByTestId('header-bar');
    fireEvent.click(htmlElement!);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: false }),
      {}
    );
  });

  it('renders component OverlayCardBox', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenCalledWith(
      {
        children: expect.any(Object),
        description:
          'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.',
        handleEvent: expect.any(Function),
        isHidden: true,
        onClose: expect.any(Function),
        submitText: 'Add Pot',
        title: 'Add New Pot',
      },
      {}
    );
  });

  it('handles handleEvent of component OverlayCardBox', async (): Promise<void> => {
    render(<PotsPage />);

    triggerAddNewPot();

    expect(addNewPot).toHaveBeenCalledWith({
      color: Colors[0].name,
      name: newInputPotName,
      target: newInputMoney,
      total: 0,
    });
  });

  it('handles handleEvent of component OverlayCardBox if potName is empty', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(htmlElement);

    expect(addNewPot).not.toHaveBeenCalled();
    expect(OverlayContentAddNewPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidNameInput: false,
      }),
      {}
    );
  });

  it('handles handleEvent of component OverlayCardBox if potName is taken', async (): Promise<void> => {
    await act(async (): Promise<void> => {
      render(<PotsPage />);
    });
    const inputName: HTMLElement = screen.getAllByTestId('overlay-content-add-new-pot-taken')[0];
    fireEvent.click(inputName);
    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(htmlElement);

    expect(addNewPot).not.toHaveBeenCalled();
    expect(OverlayContentAddNewPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidNameInput: false,
      }),
      {}
    );
  });

  it('handles handleEvent of component OverlayCardBox if potAmount is 0', async (): Promise<void> => {
    render(<PotsPage />);
    const inputName: HTMLElement = screen.getAllByTestId('overlay-content-add-new-pot')[0];
    fireEvent.click(inputName);

    const inputMoney: HTMLElement = screen.getAllByTestId(
      'overlay-content-add-new-pot-money-invalid'
    )[0];
    fireEvent.click(inputMoney);
    const htmlElement: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(htmlElement);

    expect(addNewPot).not.toHaveBeenCalled();
    expect(OverlayContentAddNewPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidTargetInput: false,
      }),
      {}
    );
  });

  it('handles onClose of component OverlayCardBox', async (): Promise<void> => {
    render(<PotsPage />);
    const headerBar: HTMLElement = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component: HTMLElement = screen.getByTestId('overlay-card-box');
    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: false }),
      {}
    );

    const cardBox: HTMLElement = screen.getByTestId('overlay-card-box-close');
    fireEvent.click(cardBox!);

    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: true }),
      {}
    );
  });

  it('renders component OverlayContentAddNewPot', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-add-new-pot')[0];

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentAddNewPot).toHaveBeenCalledWith(
      {
        handleColorChange: expect.any(Function),
        handleNameInputChange: expect.any(Function),
        handleTargetInputChange: expect.any(Function),
        hasValidNameInput: true,
        hasValidTargetInput: true,
        isHidden: true,
        selectedColorItem: Colors[0],
      },
      {}
    );
  });

  it('handles handleNameInputChange of component OverlayContentAddNewPot', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-add-new-pot')[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentAddNewPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidNameInput: true,
      }),
      {}
    );
  });

  it('handles empty handleNameInputChange of component OverlayContentAddNewPot', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getAllByTestId(
      'overlay-content-add-new-pot-invalid'
    )[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentAddNewPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidNameInput: false,
      }),
      {}
    );
  });

  it('handles handleTargetInputChange of component OverlayContentAddNewPot', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-add-new-pot-money')[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentAddNewPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidTargetInput: true,
      }),
      {}
    );
  });

  it('handles empty handleTargetInputChange of component OverlayContentAddNewPot', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getAllByTestId(
      'overlay-content-add-new-pot-money-invalid'
    )[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentAddNewPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hasValidTargetInput: false,
      }),
      {}
    );
  });

  it('handles handleColorChange of component OverlayContentAddNewPot', async (): Promise<void> => {
    render(<PotsPage />);

    const htmlElement: HTMLElement = screen.getAllByTestId('overlay-content-add-new-pot-color')[0];
    fireEvent.click(htmlElement);

    expect(htmlElement).toBeInTheDocument();
    expect(OverlayContentAddNewPot).toHaveBeenLastCalledWith(
      expect.objectContaining({
        selectedColorItem: newColor,
      }),
      {}
    );
  });
});
