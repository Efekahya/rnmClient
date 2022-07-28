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
    <div className="container">
      <button className="dropdown" onClick={handleDropdown}>
        {selected}
        <Arrow className={`arrow ${isOpen ? "down" : ""}`} />
      </button>
      <div className="psuedo">
        <div className={`itemsContainer ${isOpen ? "open" : ""}`}>
          {items.map(({ value, handleClick, label }) => (
            <div className="item">
              <button
                key={value}
                value={value}
                className={"dropdown-item "}
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
