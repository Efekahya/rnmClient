import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EpisodeDetails from "./pages/EpisodeDetails";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/episodes/:id" element={<EpisodeDetails />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
