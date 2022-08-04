import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Episode from "./pages/Episode";

import { ReactComponent as Logo } from "./assets/digieggs.svg";

import "./styles.scss";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <Navbar Logo={<Logo />} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Episode />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
