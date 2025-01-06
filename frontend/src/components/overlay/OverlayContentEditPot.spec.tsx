import React, { forwardRef, ForwardRefExoticComponent, useImperativeHandle } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import OverlayContentAddNewPot from './OverlayContentAddNewPot';
import { useLocation } from 'react-router-dom';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import OverlayDropdownColor from './OverlayDropdownColor';
import colors from '../../constants/Colors';
import { Color } from '../../model/Color';
import Colors from '../../constants/Colors';

jest.mock('../atoms/OverlayContentLabel', () =>
  jest.fn(() => <div data-testid="overlay-content-label"></div>)
);
const mockCustomNameReset: jest.Mock = jest.fn();
const mockInputCustomName: jest.Mock = jest.fn();
jest.mock('../atoms/InputCustomName', () => {
  const MockInputCustomName: ForwardRefExoticComponent<
    { handleInputChange: (input: string) => void } & React.RefAttributes<unknown>
  > = forwardRef(
    (props: { handleInputChange: (input: string) => void }, ref: React.ForwardedRef<unknown>) => {
      const { handleInputChange, ...rest } = props;

      useImperativeHandle(ref, (): { reset: jest.Mock } => ({
        reset: mockCustomNameReset,
      }));

      mockInputCustomName(props);

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleInputChange(event.target.value);
      };

      return <input {...rest} data-testid="input-custom-name" onChange={handleChange} />;
    }
  );

  MockInputCustomName.displayName = 'InputCustomName';

  return MockInputCustomName;
});
const mockMoneyReset: jest.Mock = jest.fn();
const mockInputMoney: jest.Mock = jest.fn();
jest.mock('../atoms/InputMoney', () => {
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
jest.mock('./OverlayDropdownColor', () =>
  jest.fn((props) => (
    <select
      data-testid="dropdown-color"
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        props.handleColorChange(JSON.parse(event.target.value))
      }
    >
      <option value={JSON.stringify(Colors[0])}>Red</option>
      <option value={JSON.stringify(Colors[1])}>Yellow</option>
    </select>
  ))
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('OverlayContentAddNewPot', (): void => {
  const hasValidNameInput: boolean = true;
  const mockHandleNameInputChange: (input: string) => void = jest.fn();
  const hasValidTargetInput: boolean = true;
  const mockHandleTargetInputChange: (input: number) => void = jest.fn();
  const isHidden: boolean = false;
  const selectedColorItem: Color = Colors[0];
  const mockHandleColorChange: (color: Color) => void = jest.fn();

  const testProps: {
    hasValidNameInput: boolean;
    handleNameInputChange: (input: string) => void;
    hasValidTargetInput: boolean;
    handleTargetInputChange: (input: number) => void;
    isHidden: boolean;
    selectedColorItem: Color;
    handleColorChange: (color: Color) => void;
  } = {
    hasValidNameInput,
    handleNameInputChange: mockHandleNameInputChange,
    hasValidTargetInput,
    handleTargetInputChange: mockHandleTargetInputChange,
    isHidden,
    selectedColorItem,
    handleColorChange: mockHandleColorChange,
  };

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
  });

  it('renders div overlayContentAddNewPot', () => {
    const { container: cut } = render(<OverlayContentAddNewPot {...testProps} />);

    const element: HTMLDivElement | null = cut.querySelector('.overlayContentAddNewPot');

    expect(element).toBeInTheDocument();
  });

  it('renders components OverlayContentLabel with correct text', () => {
    render(<OverlayContentAddNewPot {...testProps} />);

    const components: HTMLLabelElement[] = screen.getAllByTestId('overlay-content-label');

    expect(components).toHaveLength(3);
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(1, { title: 'Pot Name' }, {});
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(2, { title: 'Target' }, {});
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(3, { title: 'Theme' }, {});
  });

  it('renders component InputCustomName with passed prop hasValidNameInput', () => {
    render(<OverlayContentAddNewPot {...testProps} />);

    const component: HTMLLabelElement = screen.getByTestId('input-custom-name');

    expect(component).toBeInTheDocument();
    expect(mockInputCustomName).toHaveBeenCalledWith({
      handleInputChange: expect.any(Function),
      hasValidInput: hasValidNameInput,
    });
  });

  it('handles input change of InputCustomName', async () => {
    const newValue: string = 'Island';
    render(<OverlayContentAddNewPot {...testProps} />);

    const component = screen.getByTestId('input-custom-name');
    fireEvent.change(component, { target: { value: newValue } });

    expect(mockHandleNameInputChange).toHaveBeenCalledWith(newValue);
  });

  it('resets InputCustomName when passed prop isHidden changes', async () => {
    const { rerender } = render(<OverlayContentAddNewPot {...testProps} isHidden={false} />);

    rerender(<OverlayContentAddNewPot {...testProps} isHidden={true} />);

    expect(mockCustomNameReset).toHaveBeenCalled();
  });

  it('renders component InputMoney with passed prop hasValidTargetInput', () => {
    render(<OverlayContentAddNewPot {...testProps} />);

    const component: HTMLLabelElement = screen.getByTestId('input-money');

    expect(component).toBeInTheDocument();
    expect(mockInputMoney).toHaveBeenCalledWith({
      handleInputChange: expect.any(Function),
      hasValidInput: true,
    });
  });

  it('handles input change of InputMoney', async () => {
    const newValue: string = '300000';
    render(<OverlayContentAddNewPot {...testProps} />);

    const component = screen.getByTestId('input-money');
    fireEvent.change(component, { target: { value: newValue } });

    expect(mockHandleTargetInputChange).toHaveBeenCalledWith(newValue);
  });

  it('resets InputMoney when passed prop isHidden changes', async () => {
    const { rerender } = render(<OverlayContentAddNewPot {...testProps} isHidden={false} />);

    rerender(<OverlayContentAddNewPot {...testProps} isHidden={true} />);

    expect(mockMoneyReset).toHaveBeenCalled();
  });

  it('renders component OverlayDropdownColor with passed prop selectedColorItem', () => {
    render(<OverlayContentAddNewPot {...testProps} />);

    const component: HTMLLabelElement = screen.getByTestId('dropdown-color');

    expect(component).toBeInTheDocument();
    expect(OverlayDropdownColor).toHaveBeenCalledWith(
      {
        colors: colors,
        handleColorChange: expect.any(Function),
        selectedColor: selectedColorItem,
      },
      {}
    );
  });

  it('handles color change of OverlayDropdownColor', async () => {
    const newColor: Color = Colors[1];
    render(<OverlayContentAddNewPot {...testProps} />);

    const component: HTMLElement = screen.getByTestId('dropdown-color');
    fireEvent.change(component, { target: { value: JSON.stringify(newColor) } });

    expect(mockHandleColorChange).toHaveBeenCalledWith(newColor);
  });
});
