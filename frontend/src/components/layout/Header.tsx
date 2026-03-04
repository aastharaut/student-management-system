import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

interface NavLink {
  path: string;
  label: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const navLinks: NavLink[] = [
    { path: "/", label: "Home" },
    { path: "/students", label: "Students" },
    { path: "/about", label: "About" },
  ];

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = (): void => {
    navigate("/login");
  };

  const handleSignUp = (): void => {
    navigate("/signup");
    console.log("Sign up clicked");
  };

  return (
    <header className="bg-purple-900 text-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <svg
              className="w-6 h-6"
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
            <span className="text-lg font-bold font-syne">StudentManage</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium hover:text-purple-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-sm bg-white text-purple-700 rounded-md hover:bg-purple-100 transition-colors font-medium"
              aria-label="Login to your account"
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              className="px-4 py-2 text-sm bg-purple-900 text-white rounded-md hover:bg-purple-500 transition-colors font-medium border border-purple-400"
              aria-label="Create new account"
            >
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-purple-900 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-purple-900">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm hover:text-purple-200 transition-colors px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-purple-900 mt-2">
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm bg-white text-purple-700 rounded-md hover:bg-purple-100 transition-colors font-medium w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleSignUp();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm bg-purple-900 text-white rounded-md hover:bg-purple-500 transition-colors font-medium w-full border border-purple-400"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
