import React from "react";
import { ICharacterListProps } from "../../types/interfaces";

export default function CharacterList({
  characters,
  count
}: ICharacterListProps) {
  let sliced;
  if (count !== -1) {
    sliced = characters.slice(0, count);
  } else {
    sliced = characters;
  }
  return (
    <div className="characterList--container">
      <div className="characterList--characterList">
        {sliced?.map(({ image, name, id, origin, spacies }) => (
          <div className="characterList--character" key={id}>
            <div className="characterList--imageContainer">
              <div className="characterList--infoLeft">{origin}</div>
              <div className="characterList--infoRight">{spacies}</div>
              <a href={"/characters/" + id}>
                <img className="characterList--image" src={image} alt={name} />
              </a>
            </div>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
