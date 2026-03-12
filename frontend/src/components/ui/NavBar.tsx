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
    {
      path: "/admin/students",
      label: "Students",
      requiresAuth: true,
      roles: ["admin"],
    },
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      requiresAuth: true,
      roles: ["admin"],
    },
    {
      path: user?.roles === "admin" ? "/admin/profile" : "/student/profile",
      label: "Profile",
      requiresAuth: true,
    },
  ];

  const filteredLinks = navLinks.filter((link) => {
    if (link.requiresAuth && !user) return false;
    if (link.roles && user && !link.roles.includes(user.roles)) return false;
    return true;
  });

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-purple-900 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422A12.083 12.083 0 0121 21H3a12.083 12.083 0 012.84-10.422L12 14z"
                />
              </svg>
            </div>
            <span className="text-base font-bold text-purple-900 font-syne tracking-tight">
              Stuman
            </span>
          </Link>

          {/* Desktop nav*/}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-3">
            {filteredLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2.5 rounded-lg text-base font-semibold transition-all ${
                    isActive
                      ? "bg-purple-50 text-purple-900"
                      : "text-gray-600 hover:text-purple-900 hover:bg-gray-50"
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
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-purple-900 hover:bg-purple-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Spacer to balance logo on desktop */}
          <div className="hidden md:block invisible">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7" />
              <span className="text-base font-bold font-syne tracking-tight">
                StuMan
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col gap-0.5">
              {filteredLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-purple-50 text-purple-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-purple-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="border-t border-gray-100 my-1.5" />

              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-900 transition-colors w-full text-left"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-900 transition-colors"
                >
                  <User size={15} />
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
