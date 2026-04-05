import { createRoot } from "react-dom/client";
import App from "./app/App"; 
import "./styles/index.css";

// Vercel Tracking
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

injectSpeedInsights();
inject();

// The "!" tells TS that the 'root' element definitely exists in index.html
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<App />);