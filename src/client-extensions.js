import { gql } from "@apollo/client";

export const writeSortOrder = (cache, sort) => {
  cache.writeQuery({
    query: SortQuery,
    data: {
      activeSortOrder: sort,
      __typename: "Query"
    }
  });
};

export const SortQuery = gql`
  query ActiveSortOrder {
    activeSortOrder @client
  }
`;

export const typeDefs = gql`
  extend type Query {
    activeSortOrder: SortOrder!
  }
`;
