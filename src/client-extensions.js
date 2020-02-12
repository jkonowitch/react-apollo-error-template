import { gql } from "@apollo/client";

export const writeSortOrder = (cache, sort) => {
  cache.writeQuery({
    query: SortQuery,
    data: {
      activeSortOrder: sort
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
    activeSortOrder: ActiveOrder!
    shmee: String!
  }

  extend type Mutation {
    changeActiveSortOrder(order: SortOrder!): Boolean
  }

  type ActiveOrder {
    theOrder: SortOrder!
  }
`;
