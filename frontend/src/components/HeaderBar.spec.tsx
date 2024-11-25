import { fireEvent, render } from '@testing-library/react';
import { HeaderBar } from './HeaderBar';

describe('HeaderBar', () => {
  let mockHandleClick: jest.Mock<() => void>;
  const h1Headline = 'Budgets';
  const buttonText = '+ Add New Budget';
  const testProps = {
    h1Headline,
    buttonText,
  };

  beforeEach(() => {
    mockHandleClick = jest.fn();
  });

  it('renders div headerBar', () => {
    const { container } = render(<HeaderBar {...testProps} handleClick={mockHandleClick} />);

    const htmlElement = container.querySelector('.headerBar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders h1 headerBarTitle with passed headline', () => {
    const { container } = render(<HeaderBar {...testProps} handleClick={mockHandleClick} />);

    const htmlElement = container.querySelector('.headerBarTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(h1Headline);
  });

  it('renders button headerBarButton with passed buttonText', () => {
    const { container } = render(<HeaderBar {...testProps} handleClick={mockHandleClick} />);

    const htmlElement = container.querySelector('.headerBarButton');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(buttonText);
  });

  it('calls handleClick when button is clicked', () => {
    const { container } = render(<HeaderBar {...testProps} handleClick={mockHandleClick} />);

    const button = container.querySelector('.headerBarButton');
    fireEvent.click(button!);

    expect(mockHandleClick).toHaveBeenCalled();
  });
});
