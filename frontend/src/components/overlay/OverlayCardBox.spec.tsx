import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OverlayCardBox from './OverlayCardBox';
import React from 'react';
import { ReactFutureFlags } from '../../constants/ReactFutureFlags';

describe('OverlayCardBox', () => {
  const title = 'testTitle';
  const description = 'testDescription';
  const submitText = 'testSubmitText';
  const isHidden = true;
  const mockHandleEvent = jest.fn();
  const mockOnClose = jest.fn();
  const children = <></>;
  const testProps = {
    title,
    description,
    submitText,
    isHidden,
    handleEvent: mockHandleEvent,
    onClose: mockOnClose,
    children,
  };

  it('renders div overlayCardBox', async () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayCardBox {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overlayCardBox');

    expect(htmlElement).toBeInTheDocument();
  });

  it('handles keydown Enter on overlayFormHeaderBarIcon', async () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayCardBox {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overlayFormHeaderBarIcon');
    fireEvent.keyDown(htmlElement!, { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles button submit Enter on overlayFormSubmit', async () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayCardBox {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overlayFormSubmit');
    fireEvent.click(htmlElement!);

    expect(mockHandleEvent).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
