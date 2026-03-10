// // components/layout/Header.tsx
// import React from "react";
// import { Link } from "react-router";
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../../redux/store";
// import { logout } from "../../redux/slice/userSlice";
// import { LogOut, User, Bell, Settings, UserPlus } from "lucide-react";
// import Navbar from "../ui/NavBar";

// function Header() {
//   // Access user data correctly based on your slice structure
//   const user = useSelector((state: RootState) => state.user.value.data);
//   const dispatch = useDispatch();

//   const handleLogout = (): void => {
//     dispatch(logout());
//   };

//   return (
//     <>
//       {/* Top bar */}
//       <div className="bg-purple-900 text-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-12">
//             {/* Left side - Welcome message or system info */}
//             <div className="flex items-center space-x-4">
//               <span className="text-sm">
//                 {user?.firstName
//                   ? `Welcome, ${user.firstName} ${user.lastName || ""}`
//                   : "Student Management System"}
//               </span>
//             </div>

//             {/* Right side - User actions */}
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-1 text-sm hover:text-purple-200 transition-colors"
//                   >
//                     <LogOut size={18} />
//                     <span className="hidden sm:inline">Logout</span>
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex items-center space-x-3">
//                   <Link
//                     to="/login"
//                     className="flex items-center space-x-1 text-sm hover:text-purple-200 transition-colors"
//                   >
//                     <User size={18} />
//                     <span>Login</span>
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="flex items-center space-x-1 text-sm hover:text-purple-200 transition-colors border-l border-purple-700 pl-3"
//                   >
//                     <UserPlus size={18} />
//                     <span>Sign Up</span>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <Navbar />
//     </>
//   );
// }

// export default Header;

// components/layout/Header.tsx

import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/slice/userSlice";
import { LogOut, User } from "lucide-react";
import Navbar from "../ui/NavBar";

function Header() {
  const user = useSelector((state: RootState) => state.user.value.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Welcome message */}
            <span className="text-sm font-medium tracking-wide">
              {user
                ? `Welcome, ${user.firstName} ${user.lastName}`
                : "Student Management System"}
            </span>

            {/* Auth buttons — desktop only; mobile is handled inside Navbar */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-purple-200 transition-colors"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 hover:text-purple-200 transition-colors"
                >
                  <User size={16} />
                  <span className="text-sm">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navbar (handles mobile auth too) */}
      <Navbar onLogout={handleLogout} />
    </>
  );
}

export default Header;
