import { ReactElement } from "react"

export type FilterCharacter = {
  name: String
}
export interface INavbarProps {
  Logo: ReactElement
}

export interface ISearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchValue: string
  classValue: string
}
