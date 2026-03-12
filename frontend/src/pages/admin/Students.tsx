import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Search, X, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../api/api";
import AddStudentModal from "./CreateStudent";
import BreadCrumb from "../../components/ui/BreadCrumb";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  course: string;
  profilePicture?: string;
}

const PAGE_SIZE = 7;

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredStudents = students.filter((s) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    return fullName.includes(query) || s.course.toLowerCase().includes(query);
  });

  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE);
  const paginated = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb title="Students" />

      <div className="p-6">
        {/* Add Student button */}
        <div className="max-w-5xl mx-auto mb-4 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-800 active:bg-purple-950 transition-colors shadow-sm"
          >
            <UserPlus size={15} />
            Add Student
          </button>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="relative w-full max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={15}
              />
              <input
                type="text"
                placeholder="Search by name or course…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-gray-400 whitespace-nowrap">
                {filteredStudents.length} result
                {filteredStudents.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-5 py-3.5 w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => navigate(`/admin/students/${s.id}`)}
                    className="hover:bg-purple-50/50 cursor-pointer transition-colors group"
                  >
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-purple-100 shrink-0 flex items-center justify-center">
                          {s.profilePicture ? (
                            <img
                              src={`${import.meta.env.VITE_SERVER_URL}${s.profilePicture}`}
                              alt={`${s.firstName} ${s.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs font-bold text-purple-800">
                              {s.firstName[0]}
                              {s.lastName[0]}
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {s.firstName} {s.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-gray-500">
                      {s.email}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-semibold text-purple-900">
                      {s.course}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-gray-500">
                      {s.age}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-right">
                      <ChevronRight
                        size={16}
                        className="text-gray-300 group-hover:text-purple-400 transition-colors"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty states */}
            {filteredStudents.length === 0 && students.length > 0 && (
              <div className="py-14 text-center">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Search size={16} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">
                  No students match "{searchQuery}".
                </p>
              </div>
            )}
            {students.length === 0 && (
              <div className="py-14 text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <UserPlus size={16} className="text-purple-400" />
                </div>
                <p className="text-sm text-gray-400">No students yet.</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-3 text-xs text-purple-700 font-semibold hover:underline"
                >
                  Add your first student →
                </button>
              </div>
            )}
          </div>

          {/* Pagination + count */}
          {filteredStudents.length > 0 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, filteredStudents.length)} of{" "}
                {filteredStudents.length} student
                {filteredStudents.length !== 1 ? "s" : ""}
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                          currentPage === page
                            ? "bg-purple-900 text-white"
                            : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {showModal && (
          <AddStudentModal
            onClose={() => setShowModal(false)}
            onSaved={fetchStudents}
          />
        )}
      </div>
    </div>
  );
}
