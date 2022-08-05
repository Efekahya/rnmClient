import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetEpisodesByIds, GetCharactersByIds } from "../../queries/queries";

import { ICharacter, IEpisode } from "../../types/interfaces";

import EpisodeCard from "../../components/EpisodeCard";
import ShowCount from "../../components/ShowCount";
import CharacterList from "../../components/CharacterList";

import { FavoriteContext } from "../../context/favoriteContext";

import "./styles.scss";

export default function Favorites() {
  const favoritedItems = useContext(FavoriteContext);
  const favorited = JSON.parse(
    localStorage.getItem("favorites") ||
      { favoriteEpisodes: [], favoriteCharacters: [] }.toString()
  );
  const [episodes, setEpisodes] = React.useState<IEpisode[]>([]);
  const [episodeArray, setEpisodeArray] = React.useState<JSX.Element[]>([]);
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);

  const Episodes = useQuery(GetEpisodesByIds, {
    variables: {
      ids: favorited.episodes
    }
  });
  const Characters = useQuery(GetCharactersByIds, {
    variables: {
      ids: favorited.characters
    }
  });

  useEffect(() => {
    setEpisodes([]);
    setCharacters([]);
  }, []);
  useEffect(() => {
    setEpisodes([]);
    setCharacters([]);
  }, [favoritedItems]);
  useEffect(() => {
    if (Episodes.loading === false && Episodes.data) {
      setEpisodes(episodes => [...episodes, ...Episodes.data.episodesByIds]);
    }
  }, [Episodes.data, Episodes.loading]);

  useEffect(() => {
    if (Characters.loading === false && Characters.data) {
      setCharacters(characters => [
        ...characters,
        ...Characters.data.charactersByIds
      ]);
    }
  }, [Characters.data, Characters.loading]);
  useEffect(() => {
    setEpisodeArray(prevState => {
      prevState = episodes.map(
        ({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          air_date,
          name,
          id,
          episode
        }: {
          air_date: string;
          name: string;
          id: number;
          episode: string;
        }) => {
          return (
            <div className="homepage-item" key={id}>
              <EpisodeCard
                id={id}
                date={air_date}
                title={name}
                episode={episode}
                description={"lorem ipsum"}
                favorited={favorited.episodes.includes(parseInt(id.toString()))}
                handleSetFavorited={() => {
                  if (favorited.episodes.includes(parseInt(id.toString()))) {
                    favoritedItems.removeFavoriteEpisode(
                      parseInt(id.toString())
                    );
                  } else {
                    favoritedItems.addFavoriteEpisode(parseInt(id.toString()));
                  }
                }}
              />
            </div>
          );
        }
      );
      return prevState;
    });
  }, [episodes, favoritedItems]);
  return (
    <div className="favorites-main-frame">
      <div className="favorites-main-container">
        <h1>Favorites</h1>
        <ShowCount count={characters.length || 0} href="#" title="Characters" />
        {characters.length > 0 ? (
          <>
            <div className="favorites-characters">
              <CharacterList characters={characters} count={-1} />
            </div>
          </>
        ) : (
          <div className="favorites-noFavorites">
            You have no favourite character yet
          </div>
        )}
        <ShowCount count={episodes.length || 0} href="#" title="Episodes" />
        {episodes.length > 0 ? (
          <>
            <div className="favorites-episodes">{episodeArray}</div>
          </>
        ) : (
          <div className="favorites-noFavorites">
            You have no favourite episode yet
          </div>
        )}
      </div>
    </div>
  );
}
