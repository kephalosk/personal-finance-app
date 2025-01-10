import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  useImperativeHandle,
} from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PotProgressForm from './PotProgressForm';
import PotProgressDisplay from './PotProgressDisplay';
import OverlayContentLabel from '../../atoms/OverlayContentLabel';
import { EPPot } from '../../../model/entrypoints/EPPot';
import { mockedPot } from '../../../fixtures/MockedPots';

jest.mock(
  './PotProgressDisplay',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="pot-progress-display"></div>)
);
jest.mock(
  '../../atoms/OverlayContentLabel',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="overlay-content-label"></div>)
);
const mockMoneyReset: jest.Mock = jest.fn();
const mockInputMoney: jest.Mock = jest.fn();
jest.mock('../../atoms/InputMoney', () => {
  const MockInputMoney: ForwardRefExoticComponent<
    { handleInputChange: (input: string) => void } & React.RefAttributes<unknown>
  > = forwardRef(
    (props: { handleInputChange: (input: string) => void }, ref: React.ForwardedRef<unknown>) => {
      const { handleInputChange, ...rest } = props;

      useImperativeHandle(ref, (): { reset: jest.Mock } => ({
        reset: mockMoneyReset,
      }));

      mockInputMoney(props);

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleInputChange(event.target.value);
      };

      return <input {...rest} data-testid="input-money" onChange={handleChange} />;
    }
  );

  MockInputMoney.displayName = 'InputMoney';

  return MockInputMoney;
});

describe('PotProgressForm', (): void => {
  const pot: EPPot = mockedPot;
  const inputAmount: number = 0;
  const isAddition: boolean = true;
  const hasValidInput: boolean = true;
  const mockHandleInputChange: (input: number) => void = jest.fn();
  const isHidden: boolean = false;

  const testProps: {
    pot: EPPot;
    inputAmount: number;
    isAddition: boolean;
    hasValidInput: boolean;
    handleInputChange: (input: number) => void;
    isHidden: boolean;
  } = {
    pot,
    inputAmount,
    isAddition,
    hasValidInput,
    handleInputChange: mockHandleInputChange,
    isHidden,
  };

  it('renders div potProgressForm', (): void => {
    const { container } = render(<PotProgressForm {...testProps} />);

    const element: HTMLElement | null = container.querySelector('.potProgressForm');

    expect(element).toBeInTheDocument();
  });

  it('renders component PotProgressDisplay with passed props pot, inputAmount and isAddition', (): void => {
    render(<PotProgressForm {...testProps} />);

    const element: HTMLElement | null = screen.getByTestId('pot-progress-display');

    expect(element).toBeInTheDocument();
    expect(PotProgressDisplay).toHaveBeenCalledWith(
      { target: pot.target, oldTotal: pot.total, difference: inputAmount, isAddition },
      {}
    );
  });

  it.each([
    [true, 'Add'],
    [false, 'Withdraw'],
  ])(
    'renders component OverlayContentLabel with correct title when isAddition === %s',
    (isAddition: boolean, title: string): void => {
      render(<PotProgressForm {...testProps} isAddition={isAddition} />);

      const element: HTMLElement | null = screen.getByTestId('overlay-content-label');

      expect(element).toBeInTheDocument();
      expect(OverlayContentLabel).toHaveBeenCalledWith({ title: `Amount to ${title}` }, {});
    }
  );

  it('renders component InputMoney', (): void => {
    render(<PotProgressForm {...testProps} />);

    const element: HTMLElement | null = screen.getByTestId('input-money');

    expect(element).toBeInTheDocument();
    expect(mockInputMoney).toHaveBeenCalledWith({
      handleInputChange: expect.any(Function),
      hasValidInput: true,
      isLimitInput: false,
    });
  });

  it('handles input change of InputMoney', async () => {
    const newValue: string = '300000';
    render(<PotProgressForm {...testProps} />);

    const component: HTMLElement = screen.getByTestId('input-money');
    fireEvent.change(component, { target: { value: newValue } });

    expect(mockHandleInputChange).toHaveBeenCalledWith(newValue);
  });

  it('resets InputMoney when passed prop isHidden changes', async () => {
    const { rerender } = render(<PotProgressForm {...testProps} isHidden={false} />);

    rerender(<PotProgressForm {...testProps} isHidden={true} />);

    expect(mockMoneyReset).toHaveBeenCalled();
  });
});
