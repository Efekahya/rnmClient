import React, { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { FavoriteContext } from "../../context/favoriteContext";

import { GetEpisodesByIds } from "../../queries/queries";

import { IEpisode } from "../../types/interfaces";

import EpisodeList from "../../components/EpisodeList";
import ShowCount from "../../components/ShowCount";

export default function FavoriteEpisodes() {
  const favoritedItems = useContext(FavoriteContext);
  const [episodes, setEpisodes] = React.useState<IEpisode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = React.useState<IEpisode[]>(
    []
  );
  const [favoritedIds] = React.useState({
    episodeIds: favoritedItems.favoriteEpisodes,
    characterIds: favoritedItems.favoriteCharacters
  });

  const Episodes = useLazyQuery(GetEpisodesByIds, {
    variables: {
      ids: favoritedIds.episodeIds
    }
  });

  useEffect(() => {
    if (Episodes[1].loading === false && Episodes[1].data) {
      setEpisodes(Episodes[1].data.episodesByIds);
    }
  }, [Episodes]);

  useEffect(() => {
    setFilteredEpisodes(() => {
      return episodes.filter(episode => {
        return favoritedItems.favoriteEpisodes.includes(
          parseInt(episode.id.toString())
        );
      });
    });
  }, [episodes, favoritedItems]);

  useEffect(() => {
    Episodes[0]();
  }, []);

  return (
    <>
      <div className="favorite-episodes-main-frame">
        <div className="favorite-episodes-main-container">
          <div className="favorite-episodes-main-text">Favorite Episodes</div>
          <ShowCount count={filteredEpisodes.length} href="" title="Episodes" />
          <EpisodeList episodes={filteredEpisodes} count={-1} />
        </div>
      </div>
    </>
  );
}
