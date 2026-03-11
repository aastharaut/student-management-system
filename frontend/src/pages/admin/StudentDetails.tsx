import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../../api/api";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  course: string;
  profilePicture?: string;
}

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Student>>({});
  const [newPicture, setNewPicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get(`/api/admin/students/${id}`)
      .then((res) => {
        setStudent(res.data.data);
        setForm(res.data.data);
      })
      .catch((err) => console.error("Error fetching student:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    setSaving(true);

    // Use FormData so we can send the new picture alongside text fields
    const formData = new FormData();
    formData.append("firstName", form.firstName || "");
    formData.append("lastName", form.lastName || "");
    formData.append("email", form.email || "");
    formData.append("age", String(form.age || ""));
    formData.append("course", form.course || "");
    if (newPicture) {
      formData.append("profilePicture", newPicture);
    }

    api
      .put(`/api/admin/students/${id}`, formData)
      .then((res) => {
        setStudent(res.data.data);
        setEditing(false);
        setNewPicture(null);
        setPreview(null);
      })
      .catch((err) => console.error("Error updating student:", err))
      .finally(() => setSaving(false));
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    api
      .delete(`/api/admin/students/${id}`)
      .then(() => navigate("/admin/students"))
      .catch((err) => console.error("Error deleting student:", err));
  };

  const avatarUrl = preview
    ? preview
    : student?.profilePicture
      ? `${import.meta.env.VITE_SERVER_URL}${student.profilePicture}`
      : null;

  if (loading) return <p className="p-4 text-gray-400">Loading...</p>;
  if (!student) return <p className="p-4 text-gray-400">Student not found.</p>;

  return (
    <div className="container mx-auto max-w-lg p-6">
      {/* Back */}
      <button
        onClick={() => navigate("/admin/students")}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
      >
        ← Back to Students
      </button>

      {/* Profile Header */}
      <div className="flex items-center gap-5 mb-6">
        <div className="relative w-20 h-20 flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-gray-400">
                {student.firstName[0]}
                {student.lastName[0]}
              </span>
            )}
          </div>
          {/* Click to change photo in edit mode */}
          {editing && (
            <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black bg-opacity-40 cursor-pointer">
              <span className="text-white text-xs text-center leading-tight">
                Change
                <br />
                Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-gray-500">{student.email}</p>
        </div>
      </div>

      {/* Detail / Edit */}
      {editing ? (
        <div className="bg-white border rounded-lg p-4 flex flex-col gap-3 mb-6">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              First Name
            </label>
            <input
              name="firstName"
              value={form.firstName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              Last Name
            </label>
            <input
              name="lastName"
              value={form.lastName || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Email</label>
            <input
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              type="email"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Age</label>
            <input
              name="age"
              value={form.age || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              type="number"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Course</label>
            <input
              name="course"
              value={form.course || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-lg divide-y mb-6">
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">First Name</span>
            <span className="font-medium">{student.firstName}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Last Name</span>
            <span className="font-medium">{student.lastName}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{student.email}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Age</span>
            <span className="font-medium">{student.age || "—"}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-gray-500">Course</span>
            <span className="font-medium">{student.course || "—"}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      {editing ? (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditing(false);
              setPreview(null);
              setNewPicture(null);
            }}
            className="flex-1 border py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => setEditing(true)}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
