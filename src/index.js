import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { writeSortOrder, typeDefs } from "./client-extensions";
import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers: {}
});

// write default order to the cache on app bootup
writeSortOrder(cache, "DESC");

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
