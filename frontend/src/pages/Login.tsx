// import axios from "axios";
// import BreadCrumb from "../components/ui/BreadCrumb";
// import type { FormEvent } from "react";
// import notify from "../helpers/notify";
// import { useNavigate } from "react-router";
// import { ToastContainer } from "react-toastify";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const handleLogin = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.currentTarget;

//     const email = (form.elements.namedItem("email") as HTMLInputElement).value;
//     const password = (form.elements.namedItem("password") as HTMLInputElement)
//       .value;

//     axios
//       .post("http://localhost:3000/api/login", { email, password })
//       .then((response) => {
//         console.log(response.data);
//         localStorage.setItem("token", response.data.token);
//         notify.success("Login successful!");
//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Login failed:", error);
//         notify.error("Login failed. Please check your credentials.");
//       });
//   };

//   return (
//     <div className="bg-white">
//     <ToastContainer />
//       <BreadCrumb title= {"Login"} />
//       <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
//         <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Sign In
//           </button>
//         </form>
//         <div className="pt-1">
//           <a href="#" className="text-xs text-slate-500 hover:text-slate-700">
//             Forgot your password?
//           </a>
//         </div>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 text-purple-900 hover:text-purple-800 text-sm block text-center w-full"
//         >
//           Back to Home
//         </button>
//       </div>
//     </>
//   );
// }

import axios from "axios";
import BreadCrumb from "../components/ui/BreadCrumb";
import type { FormEvent } from "react";
import notify from "../helpers/notify";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    axios
      .post("http://localhost:3000/api/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        notify.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);

        let message = "Something went wrong. Please try again.";

        if (axios.isAxiosError(error)) {
          message =
            (error.response?.data as { msg?: string })?.msg ||
            "Invalid email or password";
        }

        notify.error(message);
      });
  };

  return (
    <div className="bg-white">
      <ToastContainer />
      <BreadCrumb title={"Login"} />

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
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

        <div className="pt-1">
          <a href="#" className="text-xs text-slate-500 hover:text-slate-700">
            Forgot your password?
          </a>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-purple-900 hover:text-purple-800 text-sm block text-center w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
