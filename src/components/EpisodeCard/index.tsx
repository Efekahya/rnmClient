import React from "react";

import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { IEpisodeCardProps } from "../../types/interfaces";

export default function EpisodeCard({
  id,
  episode,
  date,
  title,
  description,
  favorited,
  handleSetFavorited
}: IEpisodeCardProps) {
  return (
    <div className="episodeCard--episodeContainer">
      <div className="episodeCard--psuedo">
        <button
          className="episodeCard--favoriteButton"
          onClick={handleSetFavorited} //TODO Send request to database to favorite/unfavorite
        >
          <StarIcon
            className={`episodeCard--inline episodeCard-${
              favorited ? "filled" : "empty"
            }`}
          />
        </button>
      </div>
      <a href={`/episodes/${id}`} className="episodeCard--card">
        <div className="episodeCard--header">
          <div className="episodeCard--info">
            <div className="episodeCard--episode title">{episode}</div>
            <div className="episodeCard--date">{date}</div>
          </div>
        </div>
        <div className="episodeCard--body">
          <div className="episodeCard--title">{title}</div>
          <div className="episodeCard--secondaryText">{description}</div>
        </div>
      </a>
    </div>
  );
}
