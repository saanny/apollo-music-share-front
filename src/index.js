import React from "react";
import ReactDOM from "react-dom";
import { gql } from "@apollo/client";
import App from "./App";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});
// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:5000/graphql",
//   options: {
//     reconnect: true,
//   },
// });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        queueSongs: {
          read() {
            return queueList();
          },
        },
      },
    },
  },
});
const initialSongValue = [];
export const queueList = cache.makeVar(initialSongValue);
const client = new ApolloClient({
  link: httpLink,
  cache,
});
export function deleteQueueSong(queueList) {
  return (id) => {
    const allQueueSongs = queueList();
    const filterQueueSongs = allQueueSongs.filter((song) => song.id !== id);
    queueList(filterQueueSongs);
  };
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
