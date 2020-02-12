import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { writeSortOrder, typeDefs } from "./client-extensions";
import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  typeDefs,
  resolvers: {
    Mutation: {
      changeActiveSortOrder: (_, args, { cache }) => {
        writeSortOrder(cache, args.order);
      }
    },
    Query: {
      shmee: (_, args) => {
        console.log("resolving", args);
        if (!args.orderBy) {
          return "No argument provided";
        } else {
          return args.orderBy;
        }
      }
    }
  }
});

// write default order to the cache on app bootup
writeSortOrder(client.cache, "DESC");

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
