import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import api from "../../api/api";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function AddStudentModal({ onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    course: "",
    password: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (profilePicture) formData.append("profilePicture", profilePicture);

    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }

    api
      .post("/api/admin/students", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        onSaved();
        onClose();
      })
      .catch((err) => console.error("Error creating student:", err));
  };

  const fields = [
    { name: "firstName", placeholder: "First Name", type: "text" },
    { name: "lastName", placeholder: "Last Name", type: "text" },
    { name: "email", placeholder: "Email Address", type: "email" },
    { name: "age", placeholder: "Age", type: "number" },
    { name: "course", placeholder: "Course", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900 font-syne">
              Add Student
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Fill in the student's details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 overflow-y-auto flex-1"
        >
          {/* Profile picture */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Profile Picture
            </label>
            <div className="flex flex-col items-start gap-3">
              {preview && (
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-purple-300 hover:text-purple-900 transition-colors">
                {preview ? "Change Photo" : "Add Picture"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-3 mb-5">
            {fields.slice(0, -1).map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {f.placeholder}
                </label>
                <input
                  name={f.name}
                  value={(form as any)[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  type={f.type}
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            ))}

            {/* Password with eye toggle */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-800 transition-colors"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
