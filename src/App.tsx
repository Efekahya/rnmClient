import React from "react"
import "./styles.scss"
import Navbar from "./components/Navbar/index"
import { ReactComponent as Logo } from "./assets/profile.svg"
import CharacterList from "./components/CharacterList"
function App() {
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

  const character: ICharacter = {
    name: "Rick Sanchez",
    id: 123,
    gender: "male",
    spacies: "Human",
    origin: "Human",
    type: "",
    image: "./rick.png",
    location: "Earth",
    episodes: [{ name: "ep1" }],
  }

  return (
    <div className="App">
      <Navbar Logo={<Logo />} />

      <CharacterList
        characters={[
          character,
          character,
          character,
          character,
          character,
          character,
          character,
          character,
          character,
        ]}
        count={9}
      />
    </div>
  )
}

export default App
