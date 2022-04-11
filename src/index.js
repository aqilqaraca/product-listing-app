import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { store } from "./store/configStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Context from "./context";
const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Context>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Context>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
