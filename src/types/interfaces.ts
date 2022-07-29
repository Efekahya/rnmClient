export interface IAddFavoritesProps {
  backgroundColor: string;
  textColor: string;
  favorited: boolean;
  toggleFavorite: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
