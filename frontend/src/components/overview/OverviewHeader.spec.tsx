import { render } from '@testing-library/react';
import OverviewHeader from './OverviewHeader';
import { MemoryRouter } from 'react-router-dom';
import { ReactFutureFlags } from '../../constants/ReactFutureFlags';

describe('OverviewHeader', () => {
  const title = 'testTitle';
  const linkText = 'testLinkText';
  const linkTarget = 'testLinkTarget';

  const testProps = {
    title,
    linkText,
    linkTarget,
  };

  it('renders div overviewHeader', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewHeader {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders headline h2 with passed title', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewHeader {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('h2');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders link with passed linkText', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewHeader {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewHeaderLink');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(linkText);
  });

  it('renders the triangle svg for the link', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewHeader {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewHeaderLink');
    const svgElement = htmlElement?.querySelector('svg');

    expect(svgElement).toBeInTheDocument();
  });

  it('passes the prop linkTarget', () => {
    const { getByRole } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewHeader {...testProps} />
      </MemoryRouter>
    );

    const linkElement = getByRole('link');

    expect(linkElement).toHaveAttribute('href', `/${linkTarget}`);
  });
});
