import React from "react"
import { ICharacterListProps } from "../../types/interfaces"

export default function CharacterList({
  characters,
  count,
}: ICharacterListProps) {
  let sliced
  if (count !== -1) {
    sliced = characters.slice(0, count)
  } else {
    sliced = characters
  }
  return (
    <div className="container">
      <div className="characterList">
        {sliced?.map(({ image, name, id, origin, spacies }) => (
          <div className="character" key={id}>
            <div className="imageContainer">
              <div className="infoLeft">{origin}</div>
              <div className="infoRight">{spacies}</div>
              <a href={"/characters/" + id}>
                <img className="image" src={image} alt={name} />
              </a>
            </div>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
