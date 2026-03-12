import api from "../api/api";
import BreadCrumb from "../components/ui/BreadCrumb";
import type { FormEvent } from "react";
import { useState } from "react";
import notify from "../helpers/notify";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { login } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const res = await api.post("/api/login", {
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        password: (form.elements.namedItem("password") as HTMLInputElement)
          .value,
      });

      dispatch(login(res.data.user));
      localStorage.setItem("token", res.data.token);
      notify.success("Login successful");

      const role = res.data.user.roles;
      if (role === "admin") navigate("/admin/students");
      else if (role === "student") navigate("/student/profile");
      else navigate("/");
    } catch (err: any) {
      notify.error(err.response?.data?.msg || err.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <BreadCrumb title={"Login"} />

      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-8 bg-purple-900 w-full" />

            <div className="px-8 py-10">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-50 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-purple-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-syne">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Sign in to your account
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                      placeholder="password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-purple-700 transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-800 active:bg-purple-950 transition-colors mt-2"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-5 text-center">
                <button
                  onClick={() => navigate("/")}
                  className="text-xs text-gray-400 hover:text-purple-900 transition-colors"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
