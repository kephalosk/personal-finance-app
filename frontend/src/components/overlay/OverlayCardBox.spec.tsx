import { fireEvent, render, screen } from '@testing-library/react';
import OverlayCardBox from './OverlayCardBox';
import React from 'react';
import { OverlayCardBoxButtonTypeEnum } from '../../model/enum/OverlayCardBoxButtonTypeEnum';

describe('OverlayCardBox', () => {
  const title = 'testTitle';
  const description = 'testDescription';
  const submitText = 'testSubmitText';
  const isHidden = true;
  const mockHandleEvent = jest.fn();
  const mockOnClose = jest.fn();
  const children = <div data-testid="child-element"></div>;
  const isButtonDisabled = false;
  const buttonType = OverlayCardBoxButtonTypeEnum.CONFIRM;

  const testProps = {
    title,
    description,
    submitText,
    isHidden,
    handleEvent: mockHandleEvent,
    onClose: mockOnClose,
    children,
    isButtonDisabled,
    buttonType,
  };

  it('renders div overlayCardBox', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayCardBox');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overlayBackground with class isHidden when passed prop isHidden is true', async () => {
    const { container } = render(<OverlayCardBox {...testProps} isHidden={true} />);

    const htmlElement = container.querySelector('.overlayBackground');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('isHidden');
  });

  it('renders div overlayBackground without class isHidden when passed prop isHidden is false', async () => {
    const { container } = render(<OverlayCardBox {...testProps} isHidden={false} />);

    const htmlElement = container.querySelector('.overlayBackground');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).not.toHaveClass('isHidden');
  });

  it('renders div overlayForm with class isHidden when passed prop isHidden is true with passed prop buttonType', async () => {
    const { container } = render(
      <OverlayCardBox
        {...testProps}
        isHidden={true}
        buttonType={OverlayCardBoxButtonTypeEnum.CONFIRM}
      />
    );

    const htmlElement = container.querySelector('.overlayForm');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('role', 'dialog');
    expect(htmlElement).toHaveAttribute('aria-hidden', 'true');
    expect(htmlElement).toHaveAttribute('aria-labelledby', 'overlayTitle');
    expect(htmlElement).toHaveAttribute('aria-describedby', 'overlayDescription');
    expect(htmlElement).toHaveClass('isHidden');
    expect(htmlElement).toHaveClass(OverlayCardBoxButtonTypeEnum.CONFIRM);
  });

  it('renders div overlayForm with passed prop buttonType === abort', async () => {
    const { container } = render(
      <OverlayCardBox {...testProps} buttonType={OverlayCardBoxButtonTypeEnum.ABORT} />
    );

    const htmlElement = container.querySelector('.overlayForm');

    expect(htmlElement).toHaveClass(OverlayCardBoxButtonTypeEnum.ABORT);
  });

  it('renders div overlayForm with passed prop buttonType === undefined', async () => {
    const { container } = render(<OverlayCardBox {...testProps} buttonType={undefined} />);

    const htmlElement = container.querySelector('.overlayForm');

    expect(htmlElement).toHaveClass(OverlayCardBoxButtonTypeEnum.CONFIRM);
  });

  it('renders div overlayForm without class isHidden when passed prop isHidden is false', async () => {
    const { container } = render(<OverlayCardBox {...testProps} isHidden={false} />);

    const htmlElement = container.querySelector('.overlayForm');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('aria-hidden', 'false');
    expect(htmlElement).not.toHaveClass('isHidden');
  });

  it('renders header overlayFormHeader', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overlayFormHeaderBar', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormHeaderBar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders h2 overlayFormHeaderBarTitle with passed prop title', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormHeaderBarTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders div overlayFormHeaderBarIconContainer', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormHeaderBarIconContainer');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders img overlayFormHeaderBarIcon', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormHeaderBarIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('alt', 'closing icon');
    expect(htmlElement).toHaveAttribute('aria-hidden', 'false');
    expect(htmlElement).toHaveAttribute('src', '/images/icon-close-modal.svg');
    expect(htmlElement).toHaveAttribute('tabIndex', '0');
  });

  it('handles keydown Enter on overlayFormHeaderBarIcon', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormHeaderBarIcon');
    fireEvent.keyDown(htmlElement!, { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles click on overlayFormHeaderBarIcon', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormHeaderBarIcon');
    fireEvent.click(htmlElement!);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders p overlayFormHeaderText with passed prop description', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormHeaderText');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(description);
  });

  it('renders section overlayFormContent with passed prop children', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormContent');
    const childElement = screen.getByTestId('child-element');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toContainElement(childElement);
  });

  it('renders div overlayFormSubmitContainer with passed prop isButtonDisabled is false', async () => {
    const { container } = render(<OverlayCardBox {...testProps} isButtonDisabled={false} />);

    const htmlElement = container.querySelector('.overlayFormSubmitContainer');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).not.toHaveClass('disabled');
    expect(htmlElement).toHaveClass('isEnabled');
  });

  it('renders div overlayFormSubmitContainer with passed prop isButtonDisabled is undefined', async () => {
    const { container } = render(<OverlayCardBox {...testProps} isButtonDisabled={undefined} />);

    const htmlElement = container.querySelector('.overlayFormSubmitContainer');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).not.toHaveClass('disabled');
    expect(htmlElement).toHaveClass('isEnabled');
  });

  it('renders div overlayFormSubmitContainer with passed prop isButtonDisabled is true', async () => {
    const { container } = render(<OverlayCardBox {...testProps} isButtonDisabled={true} />);

    const htmlElement = container.querySelector('.overlayFormSubmitContainer');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('disabled');
    expect(htmlElement).not.toHaveClass('isEnabled');
  });

  it('renders button overlayFormSubmit with passed props submitText and isButtonDisabled', async () => {
    const { container } = render(
      <OverlayCardBox {...testProps} submitText={submitText} isButtonDisabled={false} />
    );

    const htmlElement = container.querySelector('.overlayFormSubmit');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(submitText);
    expect(htmlElement).not.toHaveClass('disabled');
    expect(htmlElement).toHaveClass('isEnabled');
  });

  it('renders button overlayFormSubmit with passed props isButtonDisabled is true and buttonType', async () => {
    const { container } = render(
      <OverlayCardBox
        {...testProps}
        submitText={submitText}
        isButtonDisabled={true}
        buttonType={OverlayCardBoxButtonTypeEnum.CONFIRM}
      />
    );

    const htmlElement = container.querySelector('.overlayFormSubmit');

    expect(htmlElement).toHaveClass('disabled');
    expect(htmlElement).toHaveClass(OverlayCardBoxButtonTypeEnum.CONFIRM);
    expect(htmlElement).not.toHaveClass('isEnabled');
  });

  it('renders button overlayFormSubmit with passed prop isButtonDisabled is true', async () => {
    const { container } = render(
      <OverlayCardBox {...testProps} submitText={submitText} isButtonDisabled={true} />
    );

    const htmlElement = container.querySelector('.overlayFormSubmit');

    expect(htmlElement).toHaveClass('disabled');
    expect(htmlElement).not.toHaveClass('isEnabled');
  });

  it('handles button submit Enter on overlayFormSubmit', async () => {
    const { container } = render(<OverlayCardBox {...testProps} />);

    const htmlElement = container.querySelector('.overlayFormSubmit');
    fireEvent.click(htmlElement!);

    expect(mockHandleEvent).toHaveBeenCalled();
  });
});
