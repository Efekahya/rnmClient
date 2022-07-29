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
