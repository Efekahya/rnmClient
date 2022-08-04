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
import EpisodeCharacters from "./pages/EpisodeCharacters";
import CharacterEpisodes from "./pages/CharacterEpisodes";
import { FavoriteProvider } from "./context/favoriteContext";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <FavoriteProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Navbar Logo={<Logo />} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/episodes" element={<Episode />} />
              <Route path="/episodes/:id" element={<EpisodeDetails />} />
              <Route
                path="/episodes/:id/characters"
                element={<EpisodeCharacters />}
              />
              <Route path="/characters" element={<Characters />} />
              <Route path="/characters/:id" element={<CharacterDetails />} />
              <Route
                path="/characters/:id/episodes"
                element={<CharacterEpisodes />}
              />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </FavoriteProvider>
    </>
  );
}

export default App;
