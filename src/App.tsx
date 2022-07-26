import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigation />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
