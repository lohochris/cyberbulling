import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import the Router
import App from "./app/App"; 
import "./styles/index.css";

// Vercel Tracking
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

injectSpeedInsights();
inject();

const container = document.getElementById("root")!;
const root = createRoot(container);

// Wrap App in BrowserRouter to enable navigation hooks throughout the project
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);