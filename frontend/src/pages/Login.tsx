// import api from "../api/api";
// import BreadCrumb from "../components/ui/BreadCrumb";
// import type { FormEvent } from "react";
// import notify from "../helpers/notify";
// import { useNavigate } from "react-router";
// import { ToastContainer } from "react-toastify";
// import { login } from "../redux/slice/userSlice";
// import { useDispatch } from "react-redux";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogin = (e: FormEvent<HTMLFormElement>) => {
//     console.log("Login form submitted");
//     e.preventDefault();

//     const form = e.currentTarget;
//     api
//       .post("/api/login", {
//         email: (form.elements.namedItem("email") as HTMLInputElement).value,
//         password: (form.elements.namedItem("password") as HTMLInputElement)
//           .value,
//       })
//       .then((res) => {
//         console.log(res.data);
//         dispatch(login(res.data));
//         localStorage.setItem("accessToken", res.data.token);

//         notify.success("login successful");
//         navigate("/");
//       })
//       .catch((err) => {
//         notify.error(err.response.data.msg);
//       });
//   };

//   return (
//     <div className="bg-white">
//       <ToastContainer />
//       <BreadCrumb title={"Login"} />

//       <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
//         <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
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
//             <label className="block text-gray-700 text-sm font-bold mb-2">
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
//     </div>
//   );
// }

import api from "../api/api";
import BreadCrumb from "../components/ui/BreadCrumb";
import type { FormEvent } from "react";
import notify from "../helpers/notify";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { login } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    api
      .post("/api/login", {
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        password: (form.elements.namedItem("password") as HTMLInputElement)
          .value,
      })
      .then((res) => {
        dispatch(login(res.data.user));
        localStorage.setItem("token", res.data.token);
        notify.success("Login successful");
        navigate("/");
      })
      .catch((err) => {
        notify.error(err.response.data.msg);
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
