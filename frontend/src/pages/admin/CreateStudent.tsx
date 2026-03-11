import React, { useState } from "react";
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
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("age", form.age);
    formData.append("course", form.course);
    formData.append("password", form.password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    api
      .post("/api/admin/students", formData)
      .then(() => {
        onSaved();
        onClose();
      })
      .catch((err) => console.error("Error creating student:", err));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Student</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="w-20 h-20 rounded-full border overflow-hidden bg-gray-100 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Photo</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
          </div>

          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border px-2 py-1 rounded"
            required
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border px-2 py-1 rounded"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border px-2 py-1 rounded"
            required
            type="email"
          />
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="border px-2 py-1 rounded"
            required
            type="number"
          />
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="Course"
            className="border px-2 py-1 rounded"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border px-2 py-1 rounded"
            required
            type="password"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
