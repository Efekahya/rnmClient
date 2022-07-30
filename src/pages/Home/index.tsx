import React from "react";
import { useQuery } from "@apollo/client";
import "./styles.scss";
import { GetCharacters, GetEpisodes } from "../../queries/queries";
import ShowCount from "../../components/ShowCount";
import CharacterList from "../../components/CharacterList";
import EpisodeCard from "../../components/EpisodeCard";

export default function Home() {
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
        return (
          <div className="homepage-items">
            <EpisodeCard
              key={id}
              date={air_date}
              title={name}
              episode={episode}
              description={"lorem ipsum"}
              favorited={false}
              handleSetFavorited={() => {
                console.log("favorited");
              }}
            />
          </div>
        );
      }
    }
  );
  console.log("episodes", episodes.data.episodes.results);
  return (
    <>
      <ShowCount
        count={characters.data.characters.info.count}
        title="Characters"
      />
      <CharacterList
        characters={characters.data.characters.results}
        count={8}
      />
      <ShowCount count={episodes.data.episodes.info.count} title="Episodes" />
      <div className="homepage-container">{episodesArray}</div>
    </>
  );
}
