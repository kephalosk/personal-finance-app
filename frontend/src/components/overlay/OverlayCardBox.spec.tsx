import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OverlayCardBox from './OverlayCardBox';
import React from 'react';

describe('OverlayCardBox', () => {
  const title = 'testTitle';
  const description = 'testDescription';
  const submitText = 'testSubmitText';
  const isHidden = true;
  const handleEvent = jest.fn();
  const onClose = jest.fn();
  const children = <></>;
  const testProps = {
    title,
    description,
    submitText,
    isHidden,
    handleEvent,
    onClose,
    children,
  };

  it('renders div overlayCardBox', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayCardBox {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overlayCardBox');

    expect(htmlElement).toBeInTheDocument();
  });
});
