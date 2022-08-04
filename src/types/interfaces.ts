import { ReactElement } from "react";

export interface IInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface ICharacter {
  name: string;
  id: number;
  gender: string;
  species: string;
  origin: ILocation;
  type: string;
  image: string;
  location: ILocation;
  episode: IEpisode[];
}

export interface ILocation {
  name: string;
  dimension: string;
  residents: [ICharacter];
  type: string;
}

export interface ICharacterListProps {
  characters: ICharacter[]; //TODO Characterler objesi gelince character tipi ile değiştirilecek
  count: number;
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [ICharacter];
  created: string;
}

export interface IEpisodeCardProps {
  id: number;
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

export interface INavbarProps {
  Logo: ReactElement;
}

export interface ISearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  classValue: string;
  onFocus: (focus: boolean) => void;
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
