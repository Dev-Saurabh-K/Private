import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {ToastContainer} from "react-toastify"

import "./styles/index.css";
import "./styles/theme.css";

import Login from "./pages/(Auth)/Login.jsx";
import Signup from "./pages/(Auth)/Signup.jsx"

import Dashboard from "./pages/(Dashboard)/Dashboard.jsx"
import History from "./pages/(History)/History.jsx"
import Analytics from "./pages/(Analytics)/Analytics.jsx"
import User from "./pages/(UserProfile)/User.jsx"
import Topics from "./pages/(TopicCard)/Topics.jsx"
import Notes from "./pages/(Notes)/Notes.jsx"
import Quiz from "./pages/(Quiz)/Quiz.jsx"

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup/>},
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/history", element: <History/>},
  { path: "/analytics", element: <Analytics/>},
  { path: "/profile", element: <User/>},
  { path: "/topic", element: <Topics/>},
  { path: "/notes", element: <Notes/>},
  { path: "/quiz", element: <Quiz/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>,
);
