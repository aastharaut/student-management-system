import React from "react";
import campusImage from "../assets/How-can-we-help-students-connect_7799d699-4441-4f8b-a8d4-4bae192a961e.jpg";

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={campusImage}
          alt="Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold font-syne mb-4">
              Student Management System
            </h1>
            <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto">
              Efficiently manage student records, enrollment details, and
              academic progress with a centralized and easy-to-use system.
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 md:px-8 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-900 font-syne mb-6">
          Welcome
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          This Student Management System is designed to help educational
          institutions maintain and manage student information securely and
          efficiently. Administrators can add, update, and track student records
          while maintaining data integrity and organization.
        </p>
      </section>
    </div>
  );
};

export default Home;
