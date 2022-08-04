import React from "react";
import { ISearchBarProps } from "../../types/interfaces";

export default function SearchBar({
  handleSearch,
  searchValue,
  classValue,
  onFocus
}: ISearchBarProps) {
  return (
    <input
      type="search"
      name="search"
      id="search"
      className={classValue}
      placeholder="Search"
      onChange={handleSearch}
      defaultValue={searchValue}
      onFocus={() => onFocus(true)}
      onBlur={() => onFocus(false)}
    />
  );
}
