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
interface CharacterListProps {
  characters: ICharacter[] //TODO Characterler objesi gelince character tipi ile değiştirilecek
  count: number
}
export default function CharacterList({
  characters,
  count,
}: CharacterListProps) {
  if (count !== -1) {
    characters = characters.slice(0, count)
  }
  return (
    <>
      <div className="characterList">
        {characters.map((character) => (
          <div className="character" key={character.id}>
            <span>
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
    </>
  )
}
