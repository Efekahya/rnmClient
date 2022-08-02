import { ReactElement } from "react";

export interface ICharacter {
  name: string;
  id: number;
  gender: string;
  species: string;
  origin: ILocation;
  type: string;
  image: string;
  location: ILocation;
  episodes: object[];
}

export interface ILocation {
  name: string;
  dimension: string;
  type: string;
}

export interface ICharacterListProps {
  characters: ICharacter[]; //TODO Characterler objesi gelince character tipi ile değiştirilecek
  count: number;
}
export interface IEpisodeCardProps {
  episode: string;
  date: string;
  title: string;
  description: string;
  favorited: boolean;
  handleSetFavorited: () => void;
}

export interface IAddFavoritesProps {
  themeClass: string;
  favorited: boolean;
  toggleFavorite: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => void;
}

export interface ICharacterDetailCardProps {
  title: string;
  content: string;
}

export type FilterCharacter = {
  name: string;
};
export interface INavbarProps {
  Logo: ReactElement;
}

export interface ISearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  classValue: string;
}

interface IDropdownItem {
  label: string;
  value: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IDropdownProps {
  items: IDropdownItem[];
  selected: string;
}
