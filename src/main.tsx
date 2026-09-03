import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// [GUIDE: ENTRYPOINT] Keep the stylesheet import here. Do not import the same
// global CSS again in App.tsx; that caused the previous missing-import problem.
const root = document.getElementById("root");

if (!root) throw new Error("The #root element is missing from index.html.");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
