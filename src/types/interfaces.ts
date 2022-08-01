export interface ICharacter {
  name: string;
  id: number;
  gender: string;
  spacies: string;
  origin: string;
  type: string;
  image: string;
  location: string;
  episodes: object[];
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
