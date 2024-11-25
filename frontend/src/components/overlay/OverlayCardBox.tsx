import './OverlayCardBox.scss';
import { createFocusTrap } from 'focus-trap';
import React, { useEffect, useRef } from 'react';

interface Props {
  title: string;
  description: string;
  submitText: string;
  isHidden: boolean;
  handleEvent: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

const OverlayCardBox: React.FC<Props> = ({
  title,
  description,
  submitText,
  isHidden,
  handleEvent,
  onClose,
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let focusTrap: ReturnType<typeof createFocusTrap> | null = null;

    if (overlayRef.current && !isHidden) {
      focusTrap = createFocusTrap(overlayRef.current, {
        onDeactivate: onClose,
        escapeDeactivates: true,
      });
      focusTrap.activate();
    }

    setTimeout(() => {
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        keyCode: 9,
        code: 'Tab',
        bubbles: true,
      });
      document.activeElement?.dispatchEvent(keyboardEvent);
    }, 0);

    return () => {
      focusTrap?.deactivate();
    };
  }, [isHidden, onClose]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter') {
      onClose();
    }
  };

  const handleSubmit = () => {
    handleEvent();
    onClose();
  };

  return (
    <>
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
          <p className="overlayFormHeaderText">{description}</p>
        </header>
        <section className="overlayFormContent">{children}</section>
        <button className="overlayFormSubmit" onClick={handleSubmit}>
          {submitText}
        </button>
      </div>
    </>
  );
};

export default OverlayCardBox;
