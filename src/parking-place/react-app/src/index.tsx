import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProviders } from "./components/contex/AppProvider";
import { ThemeContext } from "./components/contex/Theme";
import QueryProvider from "./components/contex/ReactQuery";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProviders>
      <ThemeContext>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ThemeContext>
    </AppProviders>
  </React.StrictMode>
);
