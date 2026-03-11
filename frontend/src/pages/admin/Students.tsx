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

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Students</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((s) => (
          <div
            key={s.id}
            onClick={() => navigate(`/admin/students/${s.id}`)}
            className="bg-white border rounded-lg p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* Profile Picture */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
              {s.profilePicture ? (
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${s.profilePicture}`}
                  alt={`${s.firstName} ${s.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-semibold text-gray-400">
                  {s.firstName[0]}
                  {s.lastName[0]}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">
                {s.firstName} {s.lastName}
              </p>
              <p className="text-sm text-gray-500 truncate">{s.email}</p>
              <div className="flex gap-3 mt-1 text-xs text-gray-400">
                <span>{s.course}</span>
                <span>Age {s.age}</span>
              </div>
            </div>

            <span className="text-gray-300 text-lg">›</span>
          </div>
        ))}

        {students.length === 0 && (
          <p className="text-gray-400 col-span-3 text-center py-8">
            No students yet. Add one to get started.
          </p>
        )}
      </div>

      {showModal && (
        <AddStudentModal
          onClose={() => setShowModal(false)}
          onSaved={fetchStudents}
        />
      )}
    </div>
  );
}
