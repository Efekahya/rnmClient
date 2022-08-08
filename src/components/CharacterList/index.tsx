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
            <div className="characterList--imageContainer">
              <div className="characterList--infoLeft">{origin.name}</div>
              <div className="characterList--infoRight">{species}</div>
              <Link to={"/characters/" + id}>
                <img
                  loading="lazy"
                  className="characterList--image"
                  src={image}
                  alt={name}
                />
              </Link>
            </div>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
