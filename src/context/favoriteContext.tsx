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
  const localFavorites = JSON.parse(
    localStorage.getItem("favorites") || `{"episodes":[],"characters":[]}`
  );

  const [favoriteEpisodes, setFavoriteEpisodes] = React.useState<number[]>(
    localFavorites.episodes
  );
  const [favoriteCharacters, setFavoriteCharacters] = React.useState<number[]>(
    localFavorites.characters
  );

  const addFavoriteEpisode = (id: number) => {
    setFavoriteEpisodes(prevState => [...prevState, id]);
    const items = JSON.parse(localStorage.getItem("favorites") || "{}");
    if (items.episodes) {
      items.episodes.push(id);
      localStorage.setItem(
        "favorites",
        JSON.stringify({
          episodes: items.episodes,
          characters: items.characters
        })
      );
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify({
          episodes: [id],
          characters: items.characters
        })
      );
    }
  };
  const addFavoriteCharacter = (id: number) => {
    setFavoriteCharacters(prevState => {
      prevState = [...prevState, id];
      return prevState;
    });
    const items = JSON.parse(localStorage.getItem("favorites") || "{}");
    if (items.characters) {
      console.log("characters", items.characters);
      items.characters.push(id);
      localStorage.setItem(
        "favorites",
        JSON.stringify({
          episodes: items.episodes,
          characters: items.characters
        })
      );
    } else {
      localStorage.setItem(
        "favorites",
        JSON.stringify({
          episodes: items.episodes,
          characters: [id]
        })
      );
    }
  };
  const removeFavoriteEpisode = (id: number) => {
    setFavoriteEpisodes(prevState => {
      prevState = prevState.filter(item => item !== id);
      return prevState;
    });
    const items = JSON.parse(localStorage.getItem("favorites") || "{}");
    if (items.episodes) {
      items.episodes = items.episodes.filter((item: number) => item !== id);
      localStorage.setItem(
        "favorites",
        JSON.stringify({
          episodes: items.episodes,
          characters: items.characters
        })
      );
    }
  };
  const removeFavoriteCharacter = (id: number) => {
    setFavoriteCharacters(prevState => {
      prevState = prevState.filter(item => item !== id);
      return prevState;
    });
    const items = JSON.parse(localStorage.getItem("favorites") || "{}");
    if (items.characters) {
      items.characters = items.characters.filter((item: number) => item !== id);
      localStorage.setItem(
        "favorites",
        JSON.stringify({
          episodes: items.episodes,
          characters: items.characters
        })
      );
    }
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
