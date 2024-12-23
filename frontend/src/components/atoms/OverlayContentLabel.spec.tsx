import { render } from '@testing-library/react';
import OverlayContentLabel from './OverlayContentLabel';

describe('OverlayContentLabel', () => {
  const title: string = 'testTitle';

  const testProps: { title: string } = {
    title,
  };

  it('renders label overlayContentLabel with passed prop title', () => {
    const { container } = render(<OverlayContentLabel {...testProps} />);

    const element = container.querySelector('.overlayContentLabel');

    expect(element).toBeInTheDocument();
    expect(element!.innerHTML).toEqual(title);
  });
});
