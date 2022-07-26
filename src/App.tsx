import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Dropdown from "./components/Dropdown";
function App() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Dropdown />
      </div>
    </ApolloProvider>
  );
}

export default App;
