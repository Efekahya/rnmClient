import React from "react"

import Navbar from "./components/Navbar/index"
import { ReactComponent as Logo } from "./assets/profile.svg"
import EpisodeCard from "./components/EpisodeCard"
function App() {
  return (
    <div className="App">
      <EpisodeCard
        date="Fri, July 32, 2020"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."
        episode="S2.E10"
        title="The End of Something"
      />
    </div>
  )
}

export default App
