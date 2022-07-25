import React from "react"

import Navigation from "./components/Navigation"
import { BrowserRouter, Routes, Route } from "react-router-dom"

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
