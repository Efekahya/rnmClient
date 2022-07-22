import React from "react"
import { Navbar } from "./components/Navbar/index"
import { ReactComponent as Logo } from "./assets/profile.svg"
function App() {
  return (
    <div className="App">
      <Navbar Logo={<Logo />} />
    </div>
  )
}

export default App
