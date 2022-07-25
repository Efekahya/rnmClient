import React from "react"

interface ICharacter {
  name: string
  id: number
  gender: string
  spacies: string
  origin: string
  type: string
  image: string
  location: string
  episodes: object[]
}
interface ICharacterListProps {
  characters: ICharacter[] //TODO Characterler objesi gelince character tipi ile değiştirilecek
  count: number
}
export default function CharacterList({
  characters,
  count,
}: ICharacterListProps) {
  let sliced
  if (count !== -1) {
    sliced = characters.slice(0, count)
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
