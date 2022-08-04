export interface IFavoriteContext {
  favoriteEpisodes: number[];
  favoriteCharacters: number[];
  addFavoriteEpisode: (id: number) => void;
  removeFavoriteEpisode: (id: number) => void;
  addFavoriteCharacter: (id: number) => void;
  removeFavoriteCharacter: (id: number) => void;
}
