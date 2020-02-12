import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { SortQuery } from "./client-extensions";

const ALL_PEOPLE = gql`
  query AllPeople($orderBy: SortOrder!) {
    people(orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const CHANGE_SORT = gql`
  mutation ChangeActiveOrder($order: SortOrder!) {
    changeActiveSortOrder(order: $order) @client
  }
`;

export default function App() {
  const [s, setS] = React.useState("ASC");
  const { loading, data, error, client, refetch } = useQuery(ALL_PEOPLE, {
    variables: { orderBy: s }
  });
  // const { data: activeSortOrder } = useQuery(SortQuery);
  console.log(data, client);
  // const [a] = useMutation(CHANGE_SORT);
  const onClick = React.useCallback(() => {
    refetch({
      variables: {
        orderBy: s === "ASC" ? "DESC" : "ASC"
      }
    });
    setS(s === "ASC" ? "DESC" : "ASC");
  }, [s]);

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <button onClick={onClick}>Change Order</button>
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
