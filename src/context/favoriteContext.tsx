import React from "react";
import { IFavoriteContext } from "../types/contextInterface";

export const FavoriteContext = React.createContext<IFavoriteContext>({
  favoriteEpisodes: [],
  favoriteCharacters: [],
  addFavoriteCharacter: () => {
    return;
  },
  removeFavoriteCharacter: () => {
    return;
  },
  addFavoriteEpisode: () => {
    return;
  },
  removeFavoriteEpisode: () => {
    return;
  }
});

export const FavoriteProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const localFavorites = JSON.parse(localStorage.getItem("favorites") || "{}");
  const [favoriteEpisodes, setFavoriteEpisodes] = React.useState<number[]>(
    localFavorites.length > 0 && localFavorites.episodes.length > 0
      ? localFavorites.episodes
      : []
  );
  const [favoriteCharacters, setFavoriteCharacters] = React.useState<number[]>(
    localFavorites.length > 0 && localFavorites.characters.length > 0
      ? localFavorites.characters
      : []
  );
  const addFavoriteEpisode = (id: number) => {
    setFavoriteEpisodes(prevState => [...prevState, id]);
    localStorage.setItem(
      "favorites",
      JSON.stringify({
        episodes: [...favoriteEpisodes, id],
        characters: favoriteCharacters
      })
    );
  };
  const addFavoriteCharacter = (id: number) => {
    setFavoriteCharacters(prevState => {
      prevState = [...prevState, id];
      return prevState;
    });
    localStorage.setItem(
      "favorites",
      JSON.stringify({
        episodes: favoriteEpisodes,
        characters: [...favoriteCharacters, id]
      })
    );
  };
  const removeFavoriteEpisode = (id: number) => {
    setFavoriteEpisodes(prevState => {
      prevState = prevState.filter(item => item !== id);
      return prevState;
    });
    localStorage.setItem(
      "favorites",
      JSON.stringify({
        episodes: favoriteEpisodes.filter(item => item !== id),
        characters: favoriteCharacters
      })
    );
  };
  const removeFavoriteCharacter = (id: number) => {
    setFavoriteCharacters(prevState => {
      prevState = prevState.filter(item => item !== id);
      return prevState;
    });
    localStorage.setItem(
      "favorites",
      JSON.stringify({
        episodes: favoriteEpisodes,
        characters: favoriteCharacters.filter(item => item !== id)
      })
    );
  };

  const value = {
    favoriteEpisodes,
    favoriteCharacters,
    addFavoriteEpisode,
    addFavoriteCharacter,
    removeFavoriteEpisode,
    removeFavoriteCharacter
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
