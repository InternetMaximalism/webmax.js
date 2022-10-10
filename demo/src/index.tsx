import { ColorModeScript } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

createRoot(container).render(
  <StrictMode>
    <ColorModeScript />
    <App />
  </StrictMode>
);

serviceWorker.unregister();

reportWebVitals();
