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
        {sliced?.map((character) => (
          <div className="character" key={character.id}>
            <span className="imageContainer">
              <img
                className="image"
                src={character.image}
                alt={character.name}
              />
            </span>
            <span>{character.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
