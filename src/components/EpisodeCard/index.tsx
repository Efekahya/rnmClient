import React from "react"
import { ReactComponent as StarIcon } from "../../assets/star.svg"
import { ReactComponent as StarFilledIcon } from "../../assets/starFilled.svg"
interface IEpisodeCardProps {
  episode: string
  date: string
  title: string
  description: string
}

export default function EpisodeCard({
  episode,
  date,
  title,
  description,
}: IEpisodeCardProps) {
  const [isFavorited, setIsFavorited] = React.useState(false)
  return (
    <div className="episodeContainer">
      <div className="psuedo">
        <button
          className="favoriteButton"
          onClick={() => {
            setIsFavorited(!isFavorited)
          }}
        >
          {isFavorited ? (
            <StarFilledIcon className="inline" />
          ) : (
            <StarIcon className="inline" />
          )}
        </button>
      </div>
      <button className="card">
        <div className="header">
          <div className="info">
            <div className="episode title">{episode}</div>
            <div className="date">{date}</div>
          </div>
        </div>
        <div className="body">
          <div className="title">{title}</div>
          <div className="secondaryText">{description}</div>
        </div>
      </button>
    </div>
  )
}
