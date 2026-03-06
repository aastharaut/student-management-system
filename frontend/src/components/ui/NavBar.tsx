// components/navigation/Navbar.tsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface NavLink {
  path: string;
  label: string;
  requiresAuth?: boolean;
  roles?: string[];
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.value.data);

  const navLinks: NavLink[] = [
    { path: "/", label: "Home" },
    { path: "/students", label: "Students" },
    { path: "/about", label: "About" },
    {
      path: "/admin",
      label: "Admin Dashboard",
      requiresAuth: true,
      roles: ["admin"],
    },
  ];

  // Filter links based on user role
  const filteredLinks = navLinks.filter((link) => {
    if (link.requiresAuth && !user) return false;
    if (link.roles && user && !link.roles.includes(user.role)) return false;
    return true;
  });

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <svg
              className="w-6 h-6 text-purple-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
            <span className="text-lg font-bold font-syne text-purple-900">
              StudentManage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-purple-900"
                      : "text-gray-600 hover:text-purple-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {filteredLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm px-2 py-2 transition-colors ${
                      isActive
                        ? "text-purple-900"
                        : "text-gray-600 hover:text-purple-900"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
