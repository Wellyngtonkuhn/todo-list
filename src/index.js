import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <QueryClientProvider client={client}>
    <CssBaseline />
    <App />

  </QueryClientProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
