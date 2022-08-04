import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetEpisodesByIds, GetCharactersByIds } from "../../queries/queries";
import { ICharacter, IEpisode } from "../../types/interfaces";
import EpisodeCard from "../../components/EpisodeCard";
import ShowCount from "../../components/ShowCount";

import { FavoriteContext } from "../../context/favoriteContext";

import "./styles.scss";
import CharacterList from "../../components/CharacterList";

export default function Favorites() {
  const favoritedItems = useContext(FavoriteContext);

  const [episodes, setEpisodes] = React.useState<IEpisode[]>([]);
  const [episodeArray, setEpisodeArray] = React.useState<JSX.Element[]>([]);
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const Episodes = useQuery(GetEpisodesByIds, {
    variables: {
      ids: favoritedItems.favoriteEpisodes
    }
  });
  const Characters = useQuery(GetCharactersByIds, {
    variables: {
      ids: favoritedItems.favoriteCharacters
    }
  });

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
                favorited={favoritedItems.favoriteEpisodes.includes(
                  parseInt(id.toString())
                )}
                handleSetFavorited={() => {
                  if (
                    favoritedItems.favoriteEpisodes.includes(
                      parseInt(id.toString())
                    )
                  ) {
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
        <ShowCount count={characters.length} href="#" title="Characters" />
        <div className="favorites-characters">
          <CharacterList characters={characters} count={-1} />
        </div>
        <ShowCount count={episodes.length} href="#" title="Episodes" />
        <div className="favorites-episodes">{episodeArray}</div>
      </div>
    </div>
  );
}
