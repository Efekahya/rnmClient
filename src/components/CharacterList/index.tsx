import React from "react";
import { Link } from "react-router-dom";
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
        {sliced?.map(({ image, name, id, origin, species }) => (
          <div className="characterList--character" key={id}>
            <Link to={"/characters/" + id} className="characterList__link">
              <div className="characterList--imageContainer">
                <div className="characterList--infoLeft">{origin.name}</div>
                <div className="characterList--infoRight">{species}</div>
                <img
                  loading="eager"
                  className="characterList--image"
                  src={image}
                  alt={name}
                />
              </div>
            </Link>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
