import React from "react";

interface ContactItem {
  icon: React.ReactNode;
  text: string;
}

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-white"
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
              <span className="text-sm font-bold font-syne">StudentManage</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              Helping educational institutions manage student records
              efficiently and effectively.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Contact
            </h3>
            <ul className="space-y-2.5">
              {contactItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-gray-300"
                >
                  <span className="mt-0.5 text-gray-400">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Newsletter
            </h3>
            <p className="text-gray-300 text-xs mb-3">
              Subscribe to get updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="px-3 py-2 text-xs text-gray-800 rounded-l-lg focus:outline-none grow bg-white placeholder-gray-400"
                required
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-r-lg text-xs font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-xs text-gray-400">
          &copy; {currentYear} Student Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
