import React from "react";
import { useNavigate } from "react-router";
import BreadCrumb from "../components/ui/BreadCrumb";
const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <BreadCrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Login", to: "/login" },
        ]}
      />
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Sign In
        </button>
      </form>
      <button
        onClick={() => navigate("/")}
        className="mt-4 text-purple-900 hover:text-purple-800 text-sm block text-center"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Login;
