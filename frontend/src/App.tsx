import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./components/layout/RootLayout";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> }, // This renders Home at the root path
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "students", element: <div>Students Page (Coming Soon)</div> },
      { path: "about", element: <div>About Page (Coming Soon)</div> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
