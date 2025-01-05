import { render, screen } from '@testing-library/react';
import OverlayContentAddNewPot from './OverlayContentAddNewPot';
import { useLocation } from 'react-router-dom';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import InputCustomName from '../atoms/InputCustomName';
import InputMoney from '../atoms/InputMoney';
import OverlayDropdownColor from './OverlayDropdownColor';
import colors from '../../constants/Colors';

jest.mock('../atoms/OverlayContentLabel', () =>
  jest.fn(() => <div data-testid="overlay-content-label"></div>)
);
jest.mock('../atoms/InputCustomName', () =>
  jest.fn(() => <div data-testid="input-custom-name"></div>)
);
jest.mock('../atoms/InputMoney', () => jest.fn(() => <div data-testid="input-money"></div>));
jest.mock('./OverlayDropdownColor', () => jest.fn(() => <div data-testid="dropdown-color"></div>));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('OverlayContentAddNewPot', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
  });

  it('renders div overlayContentAddNewPot', () => {
    const { container: cut } = render(<OverlayContentAddNewPot />);

    const element: HTMLDivElement | null = cut.querySelector('.overlayContentAddNewPot');

    expect(element).toBeInTheDocument();
  });

  it('renders components OverlayContentLabel with correct text', () => {
    render(<OverlayContentAddNewPot />);

    const components: HTMLLabelElement[] = screen.getAllByTestId('overlay-content-label');

    expect(components).toHaveLength(3);
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(1, { title: 'Pot Name' }, {});
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(2, { title: 'Target' }, {});
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(3, { title: 'Theme' }, {});
  });

  it('renders component InputCustomName', () => {
    render(<OverlayContentAddNewPot />);

    const component: HTMLLabelElement = screen.getByTestId('input-custom-name');

    expect(component).toBeInTheDocument();
    expect(InputCustomName).toHaveBeenCalledWith(
      {
        handleInputChange: expect.any(Function),
        hasValidInput: true,
      },
      {}
    );
  });

  it('renders component InputMoney', () => {
    render(<OverlayContentAddNewPot />);

    const component: HTMLLabelElement = screen.getByTestId('input-money');

    expect(component).toBeInTheDocument();
    expect(InputMoney).toHaveBeenCalledWith(
      {
        handleInputChange: expect.any(Function),
        hasValidInput: true,
      },
      {}
    );
  });

  it('renders component OverlayDropdownColor', () => {
    render(<OverlayContentAddNewPot />);

    const component: HTMLLabelElement = screen.getByTestId('dropdown-color');

    expect(component).toBeInTheDocument();
    expect(OverlayDropdownColor).toHaveBeenCalledWith(
      {
        colors: colors,
        handleColorChange: expect.any(Function),
        selectedColor: colors[0],
      },
      {}
    );
  });
});
