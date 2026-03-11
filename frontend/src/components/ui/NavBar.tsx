import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, LogOut, User } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface NavItem {
  path: string;
  label: string;
  requiresAuth?: boolean;
  roles?: string[];
}

interface NavbarProps {
  onLogout: () => void;
}

function Navbar({ onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.value.data);

  const navLinks: NavItem[] = [
    { path: "/", label: "Home" },
    // Profile path needs to be role-aware:
    {
      path: user?.roles === "admin" ? "/admin/profile" : "/student/profile",
      label: "Profile",
      requiresAuth: true,
    },
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      requiresAuth: true,
      roles: ["admin"],
    },
    {
      path: "/admin/students",
      label: "Students",
      requiresAuth: true,
      roles: ["admin"],
    },
  ];

  const filteredLinks = navLinks.filter((link) => {
    if (link.requiresAuth && !user) return false;
    if (link.roles && user && !link.roles.includes(user.roles)) return false;
    return true;
  });

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold text-purple-900">
              StudentManage
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-6">
            {filteredLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-purple-900 border-b-2 border-purple-900 pb-0.5"
                      : "text-gray-600 hover:text-purple-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-purple-900 hover:bg-purple-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {/* Nav links */}
              {filteredLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-purple-50 text-purple-900"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-100 my-1" />

              {/* Mobile auth: Login or Logout */}
              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-900 transition-colors w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-900 transition-colors"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
