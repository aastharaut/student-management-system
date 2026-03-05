import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/slice/userSlice";
import { LogOut, User, Bell, Settings } from "lucide-react";
import Navbar from "../ui/NavBar";

function Header() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Left side - Welcome message or system info */}
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {user?.firstName
                  ? `Welcome, ${user.firstName} ${user.lastName || ""}`
                  : "Student Management System"}
              </span>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center space-x-4">
              {user?.firstName ? (
                <>
                  <button className="hover:text-purple-200 transition-colors">
                    <Bell size={18} />
                  </button>
                  <button className="hover:text-purple-200 transition-colors">
                    <Settings size={18} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm hover:text-purple-200 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-sm hover:text-purple-200 transition-colors"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </>
  );
}

export default Header;
