import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Pencil, Check, X, Trash2 } from "lucide-react";
import api from "../../api/api";
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
    const formData = new FormData();
    formData.append("firstName", form.firstName || "");
    formData.append("lastName", form.lastName || "");
    formData.append("email", form.email || "");
    formData.append("age", String(form.age || ""));
    formData.append("course", form.course || "");
    if (newPicture) formData.append("profilePicture", newPicture);

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
      ? student.profilePicture
      : null;
  const initials = student
    ? `${student.firstName[0]}${student.lastName[0]}`.toUpperCase()
    : "";

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-900 rounded-full animate-spin" />
          Loading…
        </div>
      </div>
    );

  if (!student)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Student not found.</p>
      </div>
    );

  const detailRows = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Age", key: "age" },
    { label: "Course", key: "course" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb title="Student Detail" />

      <div className="p-6">
        <div className="max-w-lg mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate("/admin/students")}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-900 transition-colors mb-6"
          >
            Back to Students
          </button>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Banner */}
            <div className="h-32 bg-purple-900" />

            <div className="px-6 pb-6">
              {/* Avatar — centered */}
              <div className="flex flex-col items-center -mt-12 mb-6 text-center">
                <div className="relative w-24 h-24 shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-purple-100 border-4 border-white shadow-md flex items-center justify-center">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={`${student.firstName} ${student.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-purple-700 font-syne">
                        {initials}
                      </span>
                    )}
                  </div>
                  {editing && (
                    <label className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/40 cursor-pointer">
                      <span className="text-white text-xs text-center leading-tight font-semibold">
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
                <h1 className="mt-3 text-xl font-bold text-gray-900 font-syne">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-sm text-gray-400">{student.email}</p>
                <span className="mt-1.5 inline-block bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  Student
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-5" />

              {/* Detail / Edit */}
              {editing ? (
                <div className="space-y-4 mb-5">
                  {detailRows.map((row) => (
                    <div key={row.key}>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                        {row.label}
                      </label>
                      <input
                        name={row.key}
                        value={(form as any)[row.key] || ""}
                        onChange={handleChange}
                        type={
                          row.key === "age"
                            ? "number"
                            : row.key === "email"
                              ? "email"
                              : "text"
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-gray-100 divide-y divide-gray-50 mb-5 overflow-hidden">
                  {detailRows.map((row) => (
                    <div
                      key={row.key}
                      className="flex justify-between items-center px-4 py-3"
                    >
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {row.label}
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {row.key === "course" && (student as any)[row.key] ? (
                          <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                            {(student as any)[row.key]}
                          </span>
                        ) : (
                          (student as any)[row.key] || "—"
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              {editing ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditing(false);
                      setPreview(null);
                      setNewPicture(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-800 disabled:opacity-50 transition-colors"
                  >
                    <Check size={14} />
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-800 transition-colors"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 border border-red-200 text-red-500 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
