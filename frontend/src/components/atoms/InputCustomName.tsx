import './InputCustomName.scss';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

interface Props {
  handleInputChange: (input: string) => void;
  hasValidInput: boolean;
  initialValue?: string;
}

export interface InputCustomNameRef {
  reset: () => void;
}

const InputCustomName: ForwardRefExoticComponent<Props & RefAttributes<InputCustomNameRef>> =
  forwardRef<InputCustomNameRef, Props>(
    (
      { handleInputChange, hasValidInput, initialValue = '' }: Props,
      ref: ForwardedRef<InputCustomNameRef>
    ): ReactNode => {
      const [value, setValue] = useState<string>(initialValue);

      useEffect((): void => {
        setValue(initialValue);
      }, [initialValue]);

      useImperativeHandle(ref, (): { reset: () => void } => ({
        reset: (): void => {
          setValue(initialValue);
          if (initialValue) {
            handleInputChange(initialValue);
          }
        },
      }));

      const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (
        event: ChangeEvent<HTMLInputElement>
      ): void => {
        const rawValue: string = removeInvalidCharacters(event);
        const maxLengthValue: string = checkLength(rawValue);
        setNewInput(maxLengthValue);
      };

      const removeInvalidCharacters: (event: ChangeEvent<HTMLInputElement>) => string = (
        event: ChangeEvent<HTMLInputElement>
      ): string => {
        return event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
      };

      const checkLength: (value: string) => string = (value: string): string => {
        if (value.length > 30) {
          return value.slice(0, 30);
        }
        return value;
      };

      const setNewInput: (newValue: string) => void = (newValue: string): void => {
        if (newValue) {
          setValue(newValue);
          handleInputChange(newValue);
        } else {
          resetInput();
        }
      };

      const resetInput: () => void = (): void => {
        setValue('');
        handleInputChange('');
      };

      return (
        <div className="inputCustomNameContainer" data-testid="input-custom-name">
          <div className="inputCustomName">
            <input
              className="inputCustomNameInput"
              placeholder="e.g. Rainy Days"
              value={value}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="inputCustomNameValidationContainer">
            <label className={`inputCustomNameValidation ${hasValidInput ? '' : 'visible'}`}>
              Please enter a spending limit!
            </label>
            <label className={'inputCustomNameLength'}>{30 - value.length} characters left</label>
          </div>
        </div>
      );
    }
  );

InputCustomName.displayName = 'InputCustomName';

export default InputCustomName;
