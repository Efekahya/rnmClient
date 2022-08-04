import React from "react";
import { useQuery } from "@apollo/client";

import { GetCharacters, GetEpisodes } from "../../queries/queries";

import ShowCount from "../../components/ShowCount";
import CharacterList from "../../components/CharacterList";
import EpisodeCard from "../../components/EpisodeCard";

import "./styles.scss";

export default function Home() {
  const [favorited, setFavorited] = React.useState<number[]>([]);

  const characters = useQuery(GetCharacters, {
    variables: {
      page: 1
    }
  });
  const episodes = useQuery(GetEpisodes, {
    variables: {
      page: 1
    }
  });
  if (characters.loading || episodes.loading) return <p>Loading...</p>;
  if (characters.error || episodes.error) return <p>Error :(</p>;
  const episodesArray = episodes.data.episodes.results.map(
    (
      {
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
      },
      index: number
    ) => {
      if (index < 6) {
        const isFavorited = favorited.includes(id);
        return (
          <div className="homepage-item" key={id}>
            <EpisodeCard
              id={id}
              date={air_date}
              title={name}
              episode={episode}
              description={"lorem ipsum"}
              favorited={isFavorited}
              handleSetFavorited={() => {
                if (favorited.includes(id)) {
                  setFavorited(favorited.filter(item => item !== id));
                } else {
                  setFavorited([...favorited, id]);
                }
              }}
            />
          </div>
        );
      }
    }
  );
  return (
    <>
      <div className="homepage-main-frame">
        <div className="homepage-main-container">
          <ShowCount
            count={characters.data.characters.info.count}
            title="Characters"
            href="/characters"
          />
          <CharacterList
            characters={characters.data.characters.results}
            count={8}
          />
          <ShowCount
            count={episodes.data.episodes.info.count}
            title="Episodes"
            href="/episodes"
          />
          <div className="homepage-container">
            <div className="homepage-items">{episodesArray}</div>
          </div>
        </div>
      </div>
    </>
  );
}
