import React, { useEffect, useState } from "react";
import axios from "axios";
import AddStudentModal from "./CreateStudent";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  course: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchStudents = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // assuming your backend returns { data: [...] }
        setStudents(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    const token = localStorage.getItem("accessToken");
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchStudents())
      .catch((err) => console.error("Error deleting student:", err));
  };

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Students</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      <ul className="border rounded p-2">
        {students.map((s) => (
          <li
            key={s.id}
            className="flex justify-between items-center p-2 border-b last:border-b-0"
          >
            <span>
              {s.firstName} {s.lastName} - {s.course}
            </span>
            <button
              onClick={() => handleDelete(s.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <AddStudentModal
          onClose={() => setShowModal(false)}
          onSaved={fetchStudents}
        />
      )}
    </div>
  );
}
