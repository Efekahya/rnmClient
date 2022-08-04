import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Episode from "./pages/Episodes";
import EpisodeDetails from "./pages/EpisodeDetails";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";

import { ReactComponent as Logo } from "./assets/digieggs.svg";

import "./styles.scss";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar Logo={<Logo />} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/episodes" element={<Episode />} />
            <Route path="/episodes/:id" element={<EpisodeDetails />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetails />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
