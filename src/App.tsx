import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Characters from "./pages/Characters";
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
