import React from "react"
import { ISearchBarProps } from "../../types/interfaces"

export default function SearchBar({
  handleSearch,
  searchValue,
  classValue,
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
    />
  )
}
