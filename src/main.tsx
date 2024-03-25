import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./components/error-page.tsx";
import Login, { loginAction } from "./routes/login.tsx";
import Register, { registerAction } from "./routes/register.tsx";
import Index from "./routes/index.tsx";
import { AuthProvider, useAuth } from "./utils/auth.tsx";
import { ExcludeAuth, RequireAuth } from "./components/auth-discriminator.tsx";

const App = () => {
  const authContext = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <RequireAuth>
              <Index />
            </RequireAuth>
          ),
        },
        {
          path: "/login",
          element: (
            <ExcludeAuth>
              <Login />
            </ExcludeAuth>
          ),
          action: loginAction(authContext),
          errorElement: <ErrorPage />,
        },
        {
          path: "/register",
          element: (
            <ExcludeAuth>
              <Register />
            </ExcludeAuth>
          ),
          action: registerAction,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
