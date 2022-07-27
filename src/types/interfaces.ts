export interface ICharacter {
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
export interface ICharacterListProps {
  characters: ICharacter[] //TODO Characterler objesi gelince character tipi ile değiştirilecek
  count: number
}
