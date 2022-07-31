import React from "react";
import { useQuery } from "@apollo/client";

import { GetCharacter } from "../../queries/queries";
import { IEpisode } from "../../types/interfaces";

import AddFavorites from "../../components/AddFavorites";
import CharacterDetailCard from "../../components/CharacterDetailCard";
import EpisodeCard from "../../components/EpisodeCard";
import ShowCount from "../../components/ShowCount";

import { ReactComponent as Arrow } from "../../assets/arrow.svg";
const id = window.location.pathname.split("/")[2];

export default function CharacterDetails() {
  const { loading, error, data } = useQuery(GetCharacter, {
    variables: {
      id: id
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const episodes = data.character.episode.map(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ({ id, air_date, episode, name }: IEpisode, index: number) => {
      if (index < 3) {
        return (
          <div className="character-episode-item">
            <EpisodeCard
              key={id}
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

  return (
    <>
      <div className="character-container">
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
            <div className="character-info">
              <CharacterDetailCard
                title="Status"
                content={data.character.status}
              />
              <CharacterDetailCard
                title="Gender"
                content={data.character.gender}
              />
              <CharacterDetailCard
                title="Species"
                content={data.character.species}
              />
              <CharacterDetailCard
                title="Origin"
                content={data.character.origin.name}
              />
              <CharacterDetailCard
                title="Type"
                content={
                  data.character.type === "" ? "Unkown" : data.character.type
                }
              />
              <CharacterDetailCard
                title="Location"
                content={data.character.location.name}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="character-episode-container">
        <div className="character-episode-counter">
          <ShowCount title="Episodes" count={data.character.episode.length} />
        </div>
        <div className="character-episode-items">
          {episodes}
          <div className="character-showmore-psuedo">
            <div className="character-showmore-button">
              <a href="/episodes">
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
