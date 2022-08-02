import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Characters from "./pages/Characters";
import Navbar from "./components/Navbar";
import { ReactComponent as Logo } from "./assets/digieggs.svg";
import "./styles.scss";
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
