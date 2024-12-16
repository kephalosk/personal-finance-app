import './OverlayDropdownColor.scss';
import { Color } from '../../model/Color';
import React, { useEffect, useRef, useState } from 'react';
import ScrollToTop from '../ScrollToTop';
import OverlayDropDownColorListItem from './OverlayDropDownColorListItem';
import OverlayDropdownIcon from './OverlayDropdownIcon';

interface Props {
  selectedColor: Color;
  handleColorChange: (color: Color) => void;
  colors: Color[];
}

const OverlayDropdownColor: ({
  selectedColor,
  handleColorChange,
  colors,
}: Props) => React.ReactNode = ({ selectedColor, handleColorChange, colors }: Props) => {
  const [showColors, setShowColors] = useState<boolean>(false);
  const visibleColors: Color[] = colors.filter((color: Color): boolean => {
    return color.displayName !== selectedColor.displayName;
  });
  const dropdownRef: React.MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(
    null
  );
  const itemClassContainer: string = 'dropDownColorListItem';
  const itemClassCircle: string = 'dropdownColorCircle';
  const itemClassLabel: string = 'dropdownColorLabel';
  const clickableRefs: React.MutableRefObject<(HTMLDivElement | null)[]> = useRef<
    (HTMLDivElement | null)[]
  >([]);
  const clickableColors: Color[] = colors.filter((color: Color) => !color.disabled);

  useEffect((): void => {
    clickableRefs.current = clickableRefs.current.slice(0, clickableColors.length);
  }, [clickableColors.length]);

  useEffect((): void => {
    if (showColors && dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [showColors]);

  useEffect((): (() => void) => {
    const handleOutsideClick: (event: MouseEvent) => void = (event: MouseEvent): void => {
      const target: HTMLElement | null = event.target as HTMLElement;
      if (
        target &&
        !target.classList.contains(itemClassContainer) &&
        !target.classList.contains('dropDownColorListItemContainer') &&
        !target.classList.contains(itemClassCircle) &&
        !target.classList.contains(itemClassLabel) &&
        target.classList.value !== ''
      ) {
        setShowColors(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleClick: () => void = (): void => {
    setShowColors(!showColors);
  };

  const onItemClick: (color: Color) => void = (color: Color): void => {
    handleColorChange(color);
    if (showColors) {
      setShowColors(false);
    }
  };

  const handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleColorKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    color: Color,
    visibleIndex: number
  ) => void = (
    event: React.KeyboardEvent<HTMLDivElement>,
    color: Color,
    visibleIndex: number
  ): void => {
    if (event.key === 'Enter') {
      handleColorChange(color);
      setShowColors(false);
    }
    if (
      event.key === 'Tab' &&
      !event.shiftKey &&
      visibleIndex === clickableRefs.current.length - 1
    ) {
      event.preventDefault();
      clickableRefs.current[0]?.focus();
    }
    if (event.key === 'Tab' && event.shiftKey && visibleIndex === 0) {
      event.preventDefault();
      clickableRefs.current[clickableRefs.current.length - 1]?.focus();
    }
    if (event.key === 'Escape') {
      setShowColors(false);
    }
  };

  return (
    <div className="dropdownColorContainer" data-testid="dropdown-color">
      <div
        className="dropdownColorWrapper"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className="dropdownColor">
          <div className={`dropdownColorCircle ${selectedColor.name}`}></div>
          {selectedColor.displayName}
        </div>
      </div>
      <div ref={dropdownRef} className={`dropDownColorList ${showColors ? 'isOpen' : ''}`}>
        <OverlayDropDownColorListItem
          key={0}
          itemClassContainer={`${itemClassContainer} ${0}`}
          color={selectedColor}
          onItemClick={onItemClick}
          handleColorKeyDown={handleColorKeyDown}
          clickableRefs={clickableRefs}
          index={-1}
        />
        {visibleColors.map((color: Color, index: number) => (
          <div key={index + 1}>
            <hr className="dropDownColorListItemLine" />
            <OverlayDropDownColorListItem
              key={index + 1}
              itemClassContainer={`${itemClassContainer} ${index + 1}`}
              color={color}
              onItemClick={onItemClick}
              handleColorKeyDown={handleColorKeyDown}
              clickableRefs={clickableRefs}
              index={index}
            />
          </div>
        ))}
      </div>
      <OverlayDropdownIcon />
      <ScrollToTop />
    </div>
  );
};

export default OverlayDropdownColor;
