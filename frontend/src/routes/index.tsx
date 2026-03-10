import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RootLayout from "../components/layout/RootLayout";
import ProtectedRoute from "../components/ui/ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import CreateStudent from "../pages/admin/CreateStudent";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/me", element: <Profile /> },

      {
        path: "/admin",
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "create-student",
            element: <CreateStudent />,
          },
        ],
      },
    ],
  },
]);

function Index() {
  return <RouterProvider router={router} />;
}

export default Index;
