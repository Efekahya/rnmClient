import React from "react";
import { useQuery } from "@apollo/client";
import { GetCharacter } from "../../queries/queries";
import AddFavorites from "../../components/AddFavorites";
import CharacterDetailCard from "../../components/CharacterDetailCard";

const id = window.location.pathname.split("/")[2];

export default function CharacterDetails() {
  const { loading, error, data } = useQuery(GetCharacter, {
    variables: {
      id: id
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
    </>
  );
}
