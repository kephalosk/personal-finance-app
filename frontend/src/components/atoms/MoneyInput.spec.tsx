import MoneyInput, { InputMoneyRef } from './MoneyInput';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

describe('MoneyInput', () => {
  const mockHandleInputChange: jest.Mock = jest.fn();
  const hasValidInput: boolean = false;
  const isLimitInput: boolean = true;

  const testProps: {
    handleInputChange: jest.Mock;
    hasValidInput: boolean;
    isLimitInput: boolean;
  } = {
    handleInputChange: mockHandleInputChange,
    hasValidInput,
    isLimitInput,
  };

  let inputMoneyRef: React.RefObject<InputMoneyRef>;

  beforeEach((): void => {
    inputMoneyRef = React.createRef();
  });

  it('renders div inputMoney', (): void => {
    const { container } = render(<MoneyInput {...testProps} />);

    const element: Element | null = container.querySelector('.inputMoney');

    expect(element).toBeInTheDocument();
  });

  it('renders input inputMoneyInput with placeholder', (): void => {
    const { container } = render(<MoneyInput {...testProps} />);

    const element: Element | null = container.querySelector('.inputMoneyInput');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('placeholder', 'e.g. 2000');
    expect(element).toHaveAttribute('type', 'text');
  });

  it('renders input inputMoneyInput with passed prop initialValue', (): void => {
    const initValue: string = '1111';
    const { container } = render(<MoneyInput {...testProps} initialValue={initValue} />);

    const element: Element | null = container.querySelector('.inputMoneyInput');

    expect(element).toHaveAttribute('value', initValue);
  });

  it('renders label inputMoneyIcon with $ sign', (): void => {
    const { container } = render(<MoneyInput {...testProps} />);

    const element: Element | null = container.querySelector('.inputMoneyIcon');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('$');
  });

  it('calls callback handleInputChange with input value', (): void => {
    const inputValue: string = '12345';
    const inputValueNumber: number = 12345;
    const { container } = render(<MoneyInput {...testProps} />);

    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: inputValue } });

    expect(mockHandleInputChange).toHaveBeenCalledWith(inputValueNumber);
  });

  it('only accepts numbers as input', (): void => {
    const inputValueAlphanumeric: string = 'test123';
    const inputValueNumeric: string = '123';
    const { container } = render(<MoneyInput {...testProps} />);

    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: inputValueAlphanumeric } });

    expect(inputValueAlphanumeric).not.toEqual(inputValueNumeric);
    expect(input).toHaveAttribute('value', inputValueNumeric);
  });

  it('sets numbers bigger than 1,000,000,000,000 back to 1,000,000,000,000', () => {
    const inputValueMax: string = '1,000,000,000,000';
    const inputValueBiggerThanMax: string = '999,999,999,999,999';
    const { container } = render(<MoneyInput {...testProps} />);

    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: inputValueBiggerThanMax } });

    expect(inputValueBiggerThanMax).not.toEqual(inputValueMax);
    expect(input).toHaveAttribute('value', inputValueMax);
  });

  it('adds class active to icon when input has value', (): void => {
    const { container } = render(<MoneyInput {...testProps} />);
    const element: Element | null = container.querySelector('.inputMoneyIcon');
    expect(element).not.toHaveClass('active');

    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: '1' } });

    expect(element).toHaveClass('active');
  });

  it('removes class active from icon when input is empty', (): void => {
    const { container } = render(<MoneyInput {...testProps} />);
    const element: Element | null = container.querySelector('.inputMoneyIcon');
    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: '1' } });
    expect(element).toHaveClass('active');

    fireEvent.change(input!, { target: { value: '' } });

    expect(element).not.toHaveClass('active');
  });

  it('calls reset and resets the input value', async (): Promise<void> => {
    const initValue: string = '1111';
    const { container } = render(
      <MoneyInput {...testProps} ref={inputMoneyRef} initialValue={initValue} />
    );
    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: '12345' } });
    expect(input).toHaveAttribute('value', '12,345');
    expect(mockHandleInputChange).toHaveBeenCalledWith(12345);

    inputMoneyRef.current?.reset();

    await waitFor((): void => {
      expect(input).toHaveAttribute('value', initValue);
    });
  });

  it('renders label inputMoneyValidation for limit when passed prop hasValidInput is false and isLimitInput is true', (): void => {
    const { container } = render(
      <MoneyInput {...testProps} hasValidInput={false} isLimitInput={true} />
    );

    const element: Element | null = container.querySelector('.limitMessage');

    expect(element).toBeInTheDocument();
  });

  it('renders label inputMoneyValidation for amount when passed prop hasValidInput is false and isLimitInput is false', (): void => {
    const { container } = render(
      <MoneyInput {...testProps} hasValidInput={false} isLimitInput={false} />
    );

    const element: Element | null = container.querySelector('.amountMessage');

    expect(element).toBeInTheDocument();
  });

  it('does not render label inputMoneyValidation when passed prop hasValidInput is true', (): void => {
    const { container } = render(<MoneyInput {...testProps} hasValidInput={true} />);

    const element: Element | null = container.querySelector('.limitMessage');
    const element2: Element | null = container.querySelector('.amountMessage');

    expect(element).not.toBeInTheDocument();
    expect(element2).not.toBeInTheDocument();
  });
});
