import { render } from '@testing-library/react';
import { OverviewHeader } from './OverviewHeader';

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
    const { container } = render(<OverviewHeader {...testProps} />);

    const htmlElement = container.querySelector('.overviewHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders headline h2 with passed title', () => {
    const { container } = render(<OverviewHeader {...testProps} />);

    const htmlElement = container.querySelector('h2');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders link with passed linkText', () => {
    const { container } = render(<OverviewHeader {...testProps} />);

    const htmlElement = container.querySelector('.overviewHeaderLink');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(linkText);
  });

  it('renders the triangle svg for the link', () => {
    const { container } = render(<OverviewHeader {...testProps} />);

    const htmlElement = container.querySelector('.overviewHeaderLink');
    const svgElement = htmlElement?.querySelector('svg');

    expect(svgElement).toBeInTheDocument();
  });

  it('passes the prop linkTarget', () => {
    const { getByRole } = render(<OverviewHeader {...testProps} />);

    const linkElement = getByRole('link');

    expect(linkElement).toHaveAttribute('href', linkTarget);
  });
});
