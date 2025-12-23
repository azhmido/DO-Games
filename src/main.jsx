import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import Explore from "./pages/Explore";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import "./animations.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "games", element: <Games /> },
      { path: "games/:id", element: <GameDetail /> },
      { path: "explore", element: <Explore /> },
      { 
        path: "profile", 
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "favorites", 
        element: (
          <ProtectedRoute>
            <Favorite />
          </ProtectedRoute>
        ) 
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>  
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);