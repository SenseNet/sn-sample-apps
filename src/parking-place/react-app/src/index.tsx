import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProviders } from "./components/Contex/AppProvider";
import { ThemeContext } from "./components/Contex/Theme";
import QueryProvider from "./components/Contex/ReactQuery";

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
