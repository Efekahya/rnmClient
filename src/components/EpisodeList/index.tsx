import React, { useContext } from "react";
import { FavoriteContext } from "../../context/favoriteContext";
import { IEpisode } from "../../types/interfaces";
import EpisodeCard from "../EpisodeCard";

export default function EpisodeList({
  episodes,
  count
}: {
  episodes: IEpisode[];
  count: number;
}) {
  const favoritedItems = useContext(FavoriteContext);

  const handleFavorite = (id: number) => {
    if (favoritedItems.favoriteEpisodes.includes(parseInt(id.toString()))) {
      favoritedItems.removeFavoriteEpisode(parseInt(id.toString()));
    } else {
      favoritedItems.addFavoriteEpisode(parseInt(id.toString()));
    }
  };

  const episodesArray = episodes.map(
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
        <EpisodeCard
          id={id}
          date={air_date}
          title={name}
          episode={episode}
          description={"lorem ipsum"}
          favorited={favoritedItems.favoriteEpisodes.includes(
            parseInt(id.toString())
          )}
          handleSetFavorited={() => handleFavorite(id)}
        />
      );
    }
  );
  return (
    <div className="episode-list">
      {count != -1 ? episodesArray.slice(0, count) : episodesArray}
    </div>
  );
}
