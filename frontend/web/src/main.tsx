import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import RootLayout from "./components/RootLayout.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootLayout>
      <App />
    </RootLayout>
  </StrictMode>
);
