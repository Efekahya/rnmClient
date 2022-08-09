import React, { useContext, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GetEpisodesByIds, GetCharactersByIds } from "../../queries/queries";

import { ICharacter, IEpisode } from "../../types/interfaces";

import EpisodeCard from "../../components/EpisodeCard";
import ShowCount from "../../components/ShowCount";
import CharacterList from "../../components/CharacterList";

import { FavoriteContext } from "../../context/favoriteContext";
import EpisodeList from "../../components/EpisodeList";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Favorites() {
  const favoritedItems = useContext(FavoriteContext);

  const [episodes, setEpisodes] = React.useState<IEpisode[]>([]);
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = React.useState<IEpisode[]>(
    []
  );

  const [favoritedIds, setFavoriteIds] = React.useState({
    episodeIds: favoritedItems.favoriteEpisodes,
    characterIds: favoritedItems.favoriteCharacters
  });
  const Episodes = useLazyQuery(GetEpisodesByIds, {
    variables: {
      ids: favoritedIds.episodeIds
    }
  });
  const Characters = useLazyQuery(GetCharactersByIds, {
    variables: {
      ids: favoritedIds.characterIds
    }
  });

  useEffect(() => {
    Episodes[0]();
    Characters[0]();
  }, []);

  useEffect(() => {
    if (Episodes[1].loading === false && Episodes[1].data) {
      setEpisodes(Episodes[1].data.episodesByIds);
    }
  }, [Episodes]);

  useEffect(() => {
    if (Characters[1].loading === false && Characters[1].data) {
      setCharacters(Characters[1].data.charactersByIds);
    }
  }, [Characters]);

  useEffect(() => {
    setFilteredEpisodes(() => {
      return episodes.filter(episode => {
        return favoritedItems.favoriteEpisodes.includes(
          parseInt(episode.id.toString())
        );
      });
    });
  }, [episodes, favoritedItems]);

  return (
    <div className="favorites-main-frame">
      <div className="favorites-main-container">
        <div className="favorites-main-text">Favorites</div>
        <ShowCount
          count={characters.length || 0}
          href="/favorites/characters"
          title="Characters"
        />
        {characters.length > 0 ? (
          <>
            <div className="favorites-characters">
              <CharacterList characters={characters} count={4} />
            </div>
          </>
        ) : (
          <div className="favorites-noFavorites">
            You have no favourite character yet
          </div>
        )}
        <ShowCount
          count={filteredEpisodes.length || 0}
          href="/favorites/episodes"
          title="Episodes"
        />
        {filteredEpisodes.length > 0 ? (
          <>
            <div className="favorites-episodes">
              <EpisodeList episodes={filteredEpisodes} count={4} />
            </div>
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
