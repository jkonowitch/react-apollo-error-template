import { gql } from "@apollo/client";

export const writeSortOrder = (cache, sort) => {
  cache.writeQuery({
    query: SortQuery,
    data: {
      activeSortOrder: {
        __typename: "ActiveOrder",
        theOrder: sort
      },
      __typename: "Query"
    }
  });
};

export const SortQuery = gql`
  query ActiveSortOrder {
    activeSortOrder @client {
      theOrder
    }
  }
`;

export const typeDefs = gql`
  extend type Query {
    activeSortOrder: ActiveOrder!
  }

  extend type Mutation {
    changeActiveSortOrder(order: SortOrder!): Boolean
  }

  type ActiveOrder {
    theOrder: SortOrder!
  }
`;
