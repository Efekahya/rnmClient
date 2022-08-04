import React, { useState } from "react";
import { IDropdownProps } from "../../types/interfaces";
import { ReactComponent as Arrow } from "../../assets/arrowDown.svg";

export default function Dropdown({ items, selected }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(isOpen => !isOpen);
  };

  const click = (
    event: React.MouseEvent<HTMLButtonElement>,
    func: (event: React.MouseEvent<HTMLButtonElement>) => void
  ) => {
    func(event);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-dropdown" onClick={handleDropdown}>
        {selected}
        <Arrow className={`dropdown-arrow ${isOpen ? "dropdown-down" : ""}`} />
      </button>
      <div className="dropdown-psuedo">
        <div
          className={`dropdown-itemsContainer ${isOpen ? "dropdown-open" : ""}`}
        >
          {items.map(({ value, handleClick, label }) => (
            <div className="dropdown-item">
              <button
                key={value}
                value={value}
                className="dropdown-dropdown-item "
                onClick={event => click(event, handleClick)}
              >
                {label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
