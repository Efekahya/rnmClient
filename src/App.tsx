import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.scss";

import CharacterDetails from "./pages/CharacterDetails";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
