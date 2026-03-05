import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RootLayout from "../components/layout/RootLayout";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ui/ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { path: "/", Component: Home },
      { path: "/login", Component: Login },
      { path: "/signup", Component: Signup },
      {
        path: "/admin",
        element: <ProtectedRoute />, // ← Use 'element' not 'Component'
        children: [
          {
            path: "dashboard",
            element: <Dashboard />, // ← Use 'element' here too
          },
        ],
      },
    ],
  },
]);
function index() {
  return <RouterProvider router={router} />;
}

export default index;
