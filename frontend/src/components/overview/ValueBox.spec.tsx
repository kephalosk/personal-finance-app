import { render } from '@testing-library/react';
import { ValueBox } from './ValueBox';

describe('ValueBox', () => {
  const title: string = 'testTitle';
  const value: number = 10;
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

  it('renders div valueBoxBorder', () => {
    const { container } = render(<ValueBox {...testProps} />);

    const htmlElement = container.querySelector('.valueBoxBorder');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div valueBoxContent', () => {
    const { container } = render(<ValueBox {...testProps} />);

    const htmlElement = container.querySelector('.valueBoxContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the label valueBoxContentTitle with passed title', () => {
    const { container } = render(<ValueBox {...testProps} />);

    const htmlElement = container.querySelector('.valueBoxContentTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders the label valueBoxContentValue with passed value', () => {
    const { container } = render(<ValueBox {...testProps} />);

    const htmlElement = container.querySelector('.valueBoxContentValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${value}`);
  });
});
