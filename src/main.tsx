import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./components/error-page.tsx";
import Login from "./routes/login.tsx";
import Register from "./routes/register.tsx";
import { loginAction, registerAction } from "./components/user-form.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Register",
        element: <Register />,
        action: registerAction,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
