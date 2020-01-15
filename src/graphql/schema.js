import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull
} from "graphql";

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  }
});

const SortOrderType = new GraphQLEnumType({
  name: "SortOrder",
  values: {
    ASC: { value: "ASC" },
    DESC: { value: "DESC" }
  }
});

const peopleData = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sara Smith" },
  { id: 3, name: "Budd Deey" }
];

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      args: {
        orderBy: {
          type: new GraphQLNonNull(SortOrderType)
        }
      },
      resolve: (_, args) => {
        const sortedASC = peopleData.sort(
          (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)
        );

        if (args.orderBy === "ASC") {
          return sortedASC;
        } else {
          return sortedASC.reverse();
        }
      }
    }
  }
});

export const schema = new GraphQLSchema({ query: QueryType });
