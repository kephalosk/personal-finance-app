import { render } from '@testing-library/react';
import { ValueBox } from './ValueBox';

describe('ValueBox', () => {
  const title: string = 'testTitle';
  const value: string = 'testValue';
  const color: string = 'testColor';

  const testProps = {
    title,
    value,
    color,
  };

  it('renders div valueBox', () => {
    const { container } = render(<ValueBox {...testProps} />);

    const htmlElement = container.querySelector('.valueBox');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the label valueBoxTitle with passed title', () => {
    const { container } = render(<ValueBox {...testProps} />);

    const htmlElement = container.querySelector('.valueBoxTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders the label valueBoxValue with passed value', () => {
    const { container } = render(<ValueBox {...testProps} />);

    const htmlElement = container.querySelector('.valueBoxValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(value);
  });
});
