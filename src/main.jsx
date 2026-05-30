import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/index.css";
import "./styles/theme.css";

import Login from "./Login.jsx";

import Dashboard from "./pages/(Dashboard)/Dashboard.jsx"
import History from "./pages/(History)/History.jsx"
import Analytics from "./pages/(Analytics)/Analytics.jsx"
import User from "./pages/(UserProfile)/User.jsx"

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/history", element: <History/>},
  { path: "/analytics", element: <Analytics/>},
  { path: "/Profile", element: <User/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
