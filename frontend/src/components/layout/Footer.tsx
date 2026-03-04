import React from "react";
import { Link } from "react-router";

interface QuickLink {
  to: string;
  label: string;
}

interface ContactItem {
  icon: React.ReactNode;
  text: string;
}

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  const quickLinks: QuickLink[] = [
    { to: "/", label: "Home" },
    { to: "/students", label: "Students" },
    { to: "/about", label: "About" },
  ];

  const contactItems: ContactItem[] = [
    {
      icon: (
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      text: "+977 9866298964",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      text: "info@stuman.com",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      text: "Chandol-4, Kathmandu, Nepal",
    },
  ];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    console.log("Subscribe email:", email);
    alert(`Thank you for subscribing with: ${email}`);
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-base font-semibold mb-3 font-syne">About Us</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Student Management System helps educational institutions manage
              student records efficiently and effectively.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3 font-syne">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3 font-syne">
              Contact Us
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {contactItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="mt-0.5">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3 font-syne">
              Newsletter
            </h3>
            <p className="text-gray-300 text-xs mb-2">
              Subscribe to get updates
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="px-2 py-1.5 text-xs text-gray-900 rounded-l focus:outline-none flex-grow"
                required
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-purple-600 text-white rounded-r hover:bg-purple-500 transition-colors text-xs whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-400">
          <p>
            &copy; {currentYear} Student Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
