import { render } from '@testing-library/react';
import NoPage from './NoPage';

const msgNotFound = "The page you are looking for doesn't exist.";

describe('NoPage', () => {
  it('renders div noPage', () => {
    const { container } = render(<NoPage />);

    const htmlElement = container.querySelector('.noPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders h1 headline', () => {
    const { container } = render(<NoPage />);

    const htmlElement = container.querySelector('h1');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement!.textContent).toEqual('404 - Page Not Found');
  });

  it('renders p msgNotFound', () => {
    const { container } = render(<NoPage />);

    const htmlElement = container.querySelector('p');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement!.textContent).toEqual(msgNotFound);
  });
});
