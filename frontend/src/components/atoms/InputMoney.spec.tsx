import InputMoney from './InputMoney';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

interface InputMoneyRef {
  reset: () => void;
}

describe('InputMoney', () => {
  const mockHandleInputChange: jest.Mock = jest.fn();

  const testProps: { handleInputChange: jest.Mock } = {
    handleInputChange: mockHandleInputChange,
  };

  let inputMoneyRef: React.RefObject<InputMoneyRef>;

  beforeEach((): void => {
    inputMoneyRef = React.createRef();
  });

  it('renders div inputMoney', () => {
    const { container } = render(<InputMoney {...testProps} />);

    const element: Element | null = container.querySelector('.inputMoney');

    expect(element).toBeInTheDocument();
  });

  it('renders input inputMoneyInput with placeholder', () => {
    const { container } = render(<InputMoney {...testProps} />);

    const element: Element | null = container.querySelector('.inputMoneyInput');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('placeholder', 'e.g. 2000');
    expect(element).toHaveAttribute('type', 'text');
  });

  it('renders label inputMoneyIcon with $ sign', () => {
    const { container } = render(<InputMoney {...testProps} />);

    const element: Element | null = container.querySelector('.inputMoneyIcon');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('$');
  });

  it('calls callback handleInputChange with input value', () => {
    const inputValue: string = '12345';
    const { container } = render(<InputMoney {...testProps} />);

    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: inputValue } });

    expect(mockHandleInputChange).toHaveBeenCalledWith(inputValue);
  });

  it('only accepts numbers as input', () => {
    const inputValueAlphanumeric: string = 'test123';
    const inputValueNumeric: string = '123';
    const { container } = render(<InputMoney {...testProps} />);

    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: inputValueAlphanumeric } });

    expect(inputValueAlphanumeric).not.toEqual(inputValueNumeric);
    expect(input).toHaveAttribute('value', inputValueNumeric);
  });

  it('sets numbers bigger than 1,000,000,000,000 back to 1,000,000,000,000', () => {
    const inputValueMax: string = '1,000,000,000,000';
    const inputValueBiggerThanMax: string = '999,999,999,999,999';
    const { container } = render(<InputMoney {...testProps} />);

    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: inputValueBiggerThanMax } });

    expect(inputValueBiggerThanMax).not.toEqual(inputValueMax);
    expect(input).toHaveAttribute('value', inputValueMax);
  });

  it('adds class active to icon when input has value', () => {
    const { container } = render(<InputMoney {...testProps} />);
    const element: Element | null = container.querySelector('.inputMoneyIcon');
    expect(element).not.toHaveClass('active');

    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: '1' } });

    expect(element).toHaveClass('active');
  });

  it('removes class active from icon when input is empty', () => {
    const { container } = render(<InputMoney {...testProps} />);
    const element: Element | null = container.querySelector('.inputMoneyIcon');
    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: '1' } });
    expect(element).toHaveClass('active');

    fireEvent.change(input!, { target: { value: '' } });

    expect(element).not.toHaveClass('active');
  });

  it('calls reset and clears the input value', async () => {
    const { container } = render(<InputMoney {...testProps} ref={inputMoneyRef} />);
    const input: Element | null = container.querySelector('.inputMoneyInput');
    fireEvent.change(input!, { target: { value: '12345' } });
    expect(input).toHaveAttribute('value', '12,345');
    expect(mockHandleInputChange).toHaveBeenCalledWith('12345');

    inputMoneyRef.current?.reset();

    await waitFor(() => {
      expect(input).toHaveAttribute('value', '');
    });
    expect(mockHandleInputChange).toHaveBeenCalledWith('');
  });
});
