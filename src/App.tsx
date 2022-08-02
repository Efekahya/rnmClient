import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import { ReactComponent as Logo } from "./assets/digieggs.svg";

import "./styles.scss";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar Logo={<Logo />} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
