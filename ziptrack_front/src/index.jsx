import React from "react";
import ReactDOM from "react-dom";
import App from "./client/App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const API_ENDPOINT = "http://localhost:8000/api";
const client = new ApolloClient({
  uri: `${window.location.origin}/graphql`
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
