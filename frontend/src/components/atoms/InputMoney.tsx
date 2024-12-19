import './InputMoney.scss';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useImperativeHandle,
  useState,
} from 'react';

interface Props {
  handleInputChange: (input: number) => void;
  hasValidInput: boolean;
}

export interface InputMoneyRef {
  reset: () => void;
}

const InputMoney: ForwardRefExoticComponent<Props & RefAttributes<InputMoneyRef>> = forwardRef<
  InputMoneyRef,
  Props
>(({ handleInputChange, hasValidInput }: Props, ref: ForwardedRef<InputMoneyRef>): ReactNode => {
  const [value, setValue] = useState<string>('');

  useImperativeHandle(ref, (): { reset: () => void } => ({
    reset: (): void => {
      setValue('');
    },
  }));

  const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const rawValue: string = removeInvalidCharacters(event);
    const numericValue: number = checkUpperLimit(rawValue);
    setNewInput(numericValue);
  };

  const removeInvalidCharacters: (event: ChangeEvent<HTMLInputElement>) => string = (
    event: ChangeEvent<HTMLInputElement>
  ): string => {
    return event.target.value.replace(/[^0-9]/g, '');
  };

  const checkUpperLimit: (numericValue: string) => number = (rawValue: string): number => {
    const numericValue: number = parseInt(rawValue, 10);
    if (numericValue > 1000000000000) {
      return 1000000000000;
    }
    return numericValue;
  };

  const setNewInput: (numericValue: number) => void = (numericValue: number): void => {
    if (numericValue) {
      const formattedValue: string = numericValue.toLocaleString('en-US');
      setValue(formattedValue);
      handleInputChange(numericValue);
    } else {
      resetInput();
    }
  };

  const resetInput: () => void = (): void => {
    setValue('');
    handleInputChange(0);
  };

  return (
    <div className="inputMoneyContainer">
      <div className="inputMoney" data-testid="input-money">
        <input
          className="inputMoneyInput"
          placeholder="e.g. 2000"
          value={value}
          onChange={handleChange}
          type="text"
        />
        <label className={`inputMoneyIcon ${value ? 'active' : ''}`}>$</label>
      </div>
      <label className={`inputMoneyValidation ${hasValidInput ? '' : 'visible'}`}>
        Please enter a spending limit!
      </label>
    </div>
  );
});

InputMoney.displayName = 'InputMoney';

export default InputMoney;
