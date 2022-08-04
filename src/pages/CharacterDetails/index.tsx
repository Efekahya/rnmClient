import React from "react";
import { useQuery } from "@apollo/client";

import { GetCharacter } from "../../queries/queries";
import { IEpisode } from "../../types/interfaces";

import AddFavorites from "../../components/AddFavorites";
import CharacterDetailCard from "../../components/CharacterDetailCard";
import EpisodeCard from "../../components/EpisodeCard";
import ShowCount from "../../components/ShowCount";

import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import LoadingSpinner from "../../components/LoadingSpinner";

const id = window.location.pathname.split("/")[2];

export default function CharacterDetails() {
  const { loading, error, data } = useQuery(GetCharacter, {
    variables: {
      id
    }
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error :(</p>;

  const episodes = data.character.episode.map(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ({ id, air_date, episode, name }: IEpisode, index: number) => {
      if (index < 3) {
        return (
          <div className="character-episode-item">
            <EpisodeCard
              key={id}
              id={id}
              date={air_date}
              episode={episode}
              title={name}
              description="Lorem ipsum"
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

  const characterDetails = [
    { title: "Status", value: data.character.status },
    { title: "Gender", value: data.character.gender },
    { title: "Species", value: data.character.species },
    { title: "Origin", value: data.character.origin.name },
    {
      title: "Type",
      value: data.character.type === "" ? "Unknown" : data.character.type
    },
    { title: "Location", value: data.character.location.name }
  ];

  const characterDetailsArray = characterDetails.map(
    ({ title, value }: { title: string; value: string }) => {
      return <CharacterDetailCard title={title} content={value} />;
    }
  );

  return (
    <>
      <div className="character-container">
        <div className="character-details-container">
          <div className="character-details">
            <div className="character-name-container">
              <div className="character-name">
                <div className="character-name-text">{data.character.name}</div>
                <AddFavorites
                  favorited={false}
                  themeClass={"black transparent"}
                  toggleFavorite={() => {
                    console.log("here");
                  }}
                />
              </div>
            </div>
            <div className="character-info-container">
              <div className="character-image">
                <img
                  src={data.character.image}
                  alt={data.character.name}
                  className="character-image"
                />
              </div>
              <div className="character-info">{characterDetailsArray}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="character-episode-frame">
        <div className="character-episode-container">
          <div className="character-episode">
            <ShowCount title="Episodes" count={data.character.episode.length} />
            <div className="character-episode-items-container">
              <div className="character-episode-showmore-psuedo">
                <div className="character-episode-showmore">
                  <a href="/episodes">
                    <Arrow />
                  </a>
                </div>
              </div>
              <div className="character-episode-items">{episodes}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
