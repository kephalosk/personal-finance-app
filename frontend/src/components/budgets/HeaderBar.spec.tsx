import { render } from '@testing-library/react';
import { HeaderBar } from './HeaderBar';

describe('HeaderBar', () => {
  const h1Headline = 'Budgets';
  const buttonText = '+ Add New Budget';
  const testProps = {
    h1Headline,
    buttonText,
  };

  it('renders div headerBar', () => {
    const { container } = render(<HeaderBar {...testProps} />);

    const htmlElement = container.querySelector('.headerBar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders h1 headerBarTitle with passed headline', () => {
    const { container } = render(<HeaderBar {...testProps} />);

    const htmlElement = container.querySelector('.headerBarTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(h1Headline);
  });

  it('renders button headerBarButton with passed buttonText', () => {
    const { container } = render(<HeaderBar {...testProps} />);

    const htmlElement = container.querySelector('.headerBarButton');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(buttonText);
  });
});
