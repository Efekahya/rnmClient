import React, { useState } from "react";
import "./styles.scss";
import { IDropdownProps } from "../../types/interfaces";
import { ReactComponent as Arrow } from "../../assets/arrowDown.svg";
export default function Dropdown({ items, selected }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <div className={"container"}>
      <button className="dropdown" onClick={handleDropdown}>
        {selected}
        <Arrow className={"arrow " + (isOpen ? "down" : "")} />
      </button>
      <div className="psuedo">
        <div className={"itemsContainer " + (isOpen ? "open" : "")}>
          {items.map(item => (
            <div className="item">
              <button
                key={item.value}
                value={item.value}
                className={"dropdown-item "}
                onClick={event => {
                  item.handleClick(event);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
