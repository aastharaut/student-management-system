import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RootLayout from "../components/layout/RootLayout";
import ProtectedRoute from "../components/ui/ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import Profile from "../pages/Profile";
import StudentDetail from "../pages/admin/StudentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },

      //Admin protected routes
      {
        path: "/admin",
        element: <ProtectedRoute allowedRole="admin" />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "students", element: <Students /> },
          { path: "students/:id", element: <StudentDetail /> },
          { path: "profile", element: <Profile /> },
        ],
      },
      //Student protected routes
      {
        path: "/student",
        element: <ProtectedRoute allowedRole="student" />,
        children: [{ path: "profile", element: <Profile /> }],
      },
    ],
  },
]);

function Index() {
  return <RouterProvider router={router} />;
}

export default Index;
