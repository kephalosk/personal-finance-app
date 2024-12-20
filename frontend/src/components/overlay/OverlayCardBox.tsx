import './OverlayCardBox.scss';
import { createFocusTrap } from 'focus-trap';
import React, { ReactNode, useEffect, useRef } from 'react';

interface Props {
  title: string;
  description: string;
  submitText: string;
  isHidden: boolean;
  handleEvent: () => void;
  onClose: () => void;
  children: React.ReactNode;
  isButtonDisabled: boolean;
}

const OverlayCardBox: ({
  title,
  description,
  submitText,
  isHidden,
  handleEvent,
  onClose,
  children,
  isButtonDisabled,
}: Props) => ReactNode = ({
  title,
  description,
  submitText,
  isHidden,
  handleEvent,
  onClose,
  children,
  isButtonDisabled,
}: Props): ReactNode => {
  const overlayRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    let focusTrap: ReturnType<typeof createFocusTrap> | null = null;

    if (overlayRef.current && !isHidden) {
      focusTrap = createFocusTrap(overlayRef.current, {
        escapeDeactivates: true,
      });
      focusTrap.activate();
    }

    return (): void => {
      focusTrap?.deactivate();
    };
  }, [isHidden]);

  const handleKeyDown: (event: React.KeyboardEvent<HTMLImageElement>) => void = (
    event: React.KeyboardEvent<HTMLImageElement>
  ): void => {
    if (event.key === 'Enter') {
      onClose();
    }
  };

  const handleSubmit: () => void = (): void => {
    handleEvent();
  };

  return (
    <div className="overlayCardBox" data-testid="overlay-card-box">
      <div className={`overlayBackground ${isHidden ? 'isHidden' : ''}`}></div>
      <div
        ref={overlayRef}
        className={`overlayForm ${isHidden ? 'isHidden' : ''}`}
        role="dialog"
        aria-hidden={isHidden}
        aria-labelledby="overlayTitle"
        aria-describedby="overlayDescription"
      >
        <header className="overlayFormHeader">
          <div className="overlayFormHeaderBar">
            <h2 className="overlayFormHeaderBarTitle">{title}</h2>
            <div className="overlayFormHeaderBarIconContainer">
              <img
                className="overlayFormHeaderBarIcon"
                alt="closing icon"
                aria-hidden="false"
                src="/images/icon-close-modal.svg"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <p className="overlayFormHeaderText">{description}</p>
        </header>
        <section className="overlayFormContent">{children}</section>
        <div
          className={`overlayFormSubmitContainer ${isButtonDisabled ? 'disabled' : 'isEnabled'}`}
        >
          <button
            className={`overlayFormSubmit ${isButtonDisabled ? 'disabled' : 'isEnabled'}`}
            onClick={handleSubmit}
            tabIndex={isButtonDisabled ? -1 : 0}
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlayCardBox;
