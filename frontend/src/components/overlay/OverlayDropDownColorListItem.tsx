import './OverlayDropDownColorListItem.scss';
import React from 'react';
import { Color } from '../../model/Color';

interface Props {
  itemClassContainer: string;
  color: Color;
  onItemClick: (color: Color) => void;
  handleColorKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    color: Color,
    index: number
  ) => void;
  clickableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
}

const OverlayDropDownColorListItem: ({
  itemClassContainer,
  color,
  onItemClick,
  handleColorKeyDown,
  clickableRefs,
  index,
}: Props) => React.ReactNode = ({
  itemClassContainer,
  color,
  onItemClick,
  handleColorKeyDown,
  clickableRefs,
  index,
}: Props) => {
  return (
    <div className={`dropDownColorListItemContainer ${color.disabled ? 'disabled' : ''}`}>
      <div
        className={`${itemClassContainer} ${color.disabled ? 'disabled' : ''}`}
        data-testid="overlay-dropdown-color-list-item"
        onClick={() => onItemClick(color)}
        onKeyDown={(event) => handleColorKeyDown(event, color, index + 1)}
        tabIndex={color.disabled ? -1 : 0}
        ref={(el) => {
          if (!color.disabled) {
            clickableRefs.current[index + 1] = el;
          }
        }}
      >
        <div className={`dropdownColorCircle ${color.name}`}></div>
        <label className="dropdownColorLabel">{color.displayName}</label>
        {color.disabled && <span>Already used</span>}
      </div>
    </div>
  );
};

export default OverlayDropDownColorListItem;
