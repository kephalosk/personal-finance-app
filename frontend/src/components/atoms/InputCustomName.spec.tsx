import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import InputCustomName, { InputCustomNameRef } from './InputCustomName';

describe('InputCustomName', () => {
  const mockHandleInputChange: jest.Mock = jest.fn();
  const hasValidInput: boolean = false;
  const initialValue: string = '';

  const testProps: {
    handleInputChange: jest.Mock;
    hasValidInput: boolean;
    initialValue: string;
  } = {
    handleInputChange: mockHandleInputChange,
    hasValidInput,
    initialValue,
  };

  let inputCustomNameRef: React.RefObject<InputCustomNameRef>;

  const maxCharacters: number = 30;

  beforeEach((): void => {
    inputCustomNameRef = React.createRef();
  });

  it('renders div inputCustomNameContainer', () => {
    const { container } = render(<InputCustomName {...testProps} />);

    const element: Element | null = container.querySelector('.inputCustomNameContainer');

    expect(element).toBeInTheDocument();
  });

  it('renders div inputCustomName', () => {
    const { container } = render(<InputCustomName {...testProps} />);

    const element: Element | null = container.querySelector('.inputCustomName');

    expect(element).toBeInTheDocument();
  });

  it('renders input inputCustomNameInput with initialValue', () => {
    const testValue: string = 'testValue';
    const { container } = render(<InputCustomName {...testProps} initialValue={testValue} />);

    const element: Element | null = container.querySelector('.inputCustomNameInput');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('placeholder', 'e.g. Rainy Days');
    expect(element).toHaveAttribute('type', 'text');
    expect(element).toHaveAttribute('value', testValue);
  });

  it('calls callback handleInputChange when input inputCustomNameInput has changed', () => {
    const testValue: string = 'testValue';
    const testInput: string = 'testInput';
    const { container } = render(<InputCustomName {...testProps} initialValue={testValue} />);

    const element: Element | null = container.querySelector('.inputCustomNameInput');
    fireEvent.change(element!, { target: { value: testInput } });

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('value', testInput);
    expect(mockHandleInputChange).toHaveBeenCalledWith(testInput);
  });

  it('removes critical characters from input inputCustomNameInput', () => {
    const testValueCritical: string =
      'testValue°!"§$%&/()=?`´^*+\'#-_.:,;<>¿≠}{|][¢¶“¡„≤∞…–‘±«∑€®†¨⁄øπ•æœ@∆ºª©ƒ∂‚å¥≈ç√∫~µ12345';
    const testValueCleaned: string = 'testValue12345';
    const { container } = render(<InputCustomName {...testProps} />);

    const element: Element | null = container.querySelector('.inputCustomNameInput');
    fireEvent.change(element!, { target: { value: testValueCritical } });

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('value', testValueCleaned);
    expect(element).not.toHaveAttribute('value', testValueCritical);
    expect(mockHandleInputChange).toHaveBeenCalledWith(testValueCleaned);
    expect(mockHandleInputChange).not.toHaveBeenCalledWith(testValueCritical);
  });

  it('cuts input length bigger than 30 chars back to 30 chars', () => {
    const testValueLongerThan30Chars: string = 'acbdeacb10acbdeacb20acbdeacb30acbdeacb40';
    const testValueCuttedBackTo30Chars: string = 'acbdeacb10acbdeacb20acbdeacb30';
    const { container } = render(<InputCustomName {...testProps} />);

    const element: Element | null = container.querySelector('.inputCustomNameInput');
    fireEvent.change(element!, { target: { value: testValueLongerThan30Chars } });

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('value', testValueCuttedBackTo30Chars);
    expect(element).not.toHaveAttribute('value', testValueLongerThan30Chars);
    expect(mockHandleInputChange).toHaveBeenCalledWith(testValueCuttedBackTo30Chars);
    expect(mockHandleInputChange).not.toHaveBeenCalledWith(testValueLongerThan30Chars);
  });

  it('set initValue in case of reset', async () => {
    const initValue: string = 'initValue';
    const changedValue: string = 'changedValue';
    const { container } = render(
      <InputCustomName {...testProps} ref={inputCustomNameRef} initialValue={initValue} />
    );
    const element: Element | null = container.querySelector('.inputCustomNameInput');
    fireEvent.change(element!, { target: { value: changedValue } });
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('value', changedValue);
    expect(mockHandleInputChange).toHaveBeenLastCalledWith(changedValue);

    inputCustomNameRef.current?.reset();

    await waitFor(() => {
      expect(element).toHaveAttribute('value', initValue);
      expect(mockHandleInputChange).toHaveBeenLastCalledWith(initValue);
    });
  });

  it('handles empty input', async () => {
    const initValue: string = 'initValue';
    const emptyString: string = '';
    const { container } = render(
      <InputCustomName {...testProps} ref={inputCustomNameRef} initialValue={initValue} />
    );

    const element: Element | null = container.querySelector('.inputCustomNameInput');
    fireEvent.change(element!, { target: { value: emptyString } });

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('value', emptyString);
    expect(mockHandleInputChange).toHaveBeenLastCalledWith(emptyString);
  });

  it('renders div inputCustomNameValidationContainer', () => {
    const { container } = render(<InputCustomName {...testProps} />);

    const element: Element | null = container.querySelector('.inputCustomNameValidationContainer');

    expect(element).toBeInTheDocument();
  });

  it('renders label inputCustomNameValidation with passed prop hasValidInput === true', () => {
    const { container } = render(<InputCustomName {...testProps} hasValidInput={true} />);

    const element: Element | null = container.querySelector('.inputCustomNameValidation');

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('visible');
  });

  it('renders label inputCustomNameValidation with passed prop hasValidInput === false', () => {
    const { container } = render(<InputCustomName {...testProps} hasValidInput={false} />);

    const element: Element | null = container.querySelector('.inputCustomNameValidation');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('visible');
    expect(element).toHaveTextContent('Please enter a spending limit!');
  });

  it('renders label inputCustomNameLength with leftover amount of charactors', () => {
    const initValueLength9: string = '123456789';
    const { container: cut } = render(
      <InputCustomName {...testProps} initialValue={initValueLength9} />
    );

    const element: Element | null = cut.querySelector('.inputCustomNameLength');

    expect(element).toBeInTheDocument();
    expect(element!.innerHTML).toEqual(
      `${maxCharacters - initValueLength9.length} characters left`
    );
  });

  it('handles undefined prop initialValue', async () => {
    const emptyString: string = '';
    const { container } = render(<InputCustomName {...testProps} initialValue={undefined} />);

    const element: Element | null = container.querySelector('.inputCustomNameInput');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('value', emptyString);
  });
});
