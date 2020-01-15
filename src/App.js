import React from "react";
import { gql, useQuery } from "@apollo/client";
import { SortQuery } from "./client-extensions";

const ALL_PEOPLE = gql`
  query AllPeople($orderBy: SortOrder!) {
    activeSortOrder @client @export(as: "orderBy")
    people(orderBy: $orderBy) {
      id
      name
    }
  }
`;

export default function App() {
  const { loading, data, error } = useQuery(ALL_PEOPLE);
  const { data: activeSortOrder } = useQuery(SortQuery);

  console.log(error, data);

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <p>Active Sort Order: {JSON.stringify(activeSortOrder)}</p>
      <h2>Names</h2>
      {loading || Boolean(error) ? (
        <>
          <p>Loading…</p>
          <pre>{JSON.stringify(error)}</pre>
        </>
      ) : (
        <ul>
          {data.people.map(person => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
