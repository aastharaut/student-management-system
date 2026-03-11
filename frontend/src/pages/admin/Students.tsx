import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/api";
import AddStudentModal from "./CreateStudent";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  course: string;
  profilePicture?: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchStudents = () => {
    api
      .get("/api/admin/students")
      .then((res) => setStudents(res.data.data || []))
      .catch((err) => console.error("Error fetching students:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    return fullName.includes(query) || s.course.toLowerCase().includes(query);
  });

  return (
    <div className="container p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Students</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Student
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-1 text-xs text-gray-400">
            {filteredStudents.length} result
            {filteredStudents.length !== 1 ? "s" : ""} for &quot;{searchQuery}
            &quot;
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStudents.map((s) => (
              <tr
                key={s.id}
                onClick={() => navigate(`/admin/students/${s.id}`)}
                className="hover:bg-blue-50 cursor-pointer transition-colors"
              >
                {/* Student name + avatar */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                      {s.profilePicture ? (
                        <img
                          src={`${import.meta.env.VITE_SERVER_URL}${s.profilePicture}`}
                          alt={`${s.firstName} ${s.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-gray-400">
                          {s.firstName[0]}
                          {s.lastName[0]}
                        </span>
                      )}
                    </div>
                    <span className="font-medium text-gray-800">
                      {s.firstName} {s.lastName}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                  {s.email}
                </td>

                {/* Course */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {s.course}
                  </span>
                </td>

                {/* Age */}
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                  {s.age}
                </td>

                {/* Arrow */}
                <td className="px-4 py-3 whitespace-nowrap text-right text-gray-300 text-lg">
                  ›
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty states */}
        {filteredStudents.length === 0 && students.length > 0 && (
          <div className="py-10 text-center text-gray-400 text-sm">
            No students match &quot;{searchQuery}&quot;. Try a different name or
            course.
          </div>
        )}
        {students.length === 0 && (
          <div className="py-10 text-center text-gray-400 text-sm">
            No students yet. Add one to get started.
          </div>
        )}
      </div>

      {/* Footer count */}
      {students.length > 0 && (
        <p className="mt-3 text-xs text-gray-400 text-right">
          Showing {filteredStudents.length} of {students.length} student
          {students.length !== 1 ? "s" : ""}
        </p>
      )}

      {showModal && (
        <AddStudentModal
          onClose={() => setShowModal(false)}
          onSaved={fetchStudents}
        />
      )}
    </div>
  );
}
