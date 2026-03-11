import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import type { RootState } from "../../redux/store";
import { Navigate } from "react-router";

function ProtectedRoute({ allowedRole }: { allowedRole?: string }) {
  const user = useSelector((root: RootState) => root.user.value.data);

  if (!user) return <Navigate to="/login" />;

  if (allowedRole && user.roles !== allowedRole) {
    // Redirect to their own profile if they try to access wrong role's pages
    return <Navigate to={`/${user.roles}/profile`} />;
  }

  return <Outlet />;
}
export default ProtectedRoute;
