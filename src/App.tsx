import React from "react"

import Navbar from "./components/Navbar/index"
import { ReactComponent as DigiEggs } from "./assets/digieggs.svg"
import EpisodeCard from "./components/EpisodeCard"

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

function App() {
  return (
    <div className="App">
      <Navbar Logo={<DigiEggs />} />

      <EpisodeCard
        episode="S2.E10"
        date="Fri, July 32, 2020"
        title="The End of Something"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore incididunt ut laboreincididunt ut laboreet dolore..."
      />
    </div>
  )
}

export default App
