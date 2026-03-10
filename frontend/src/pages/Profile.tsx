import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import type { RootState } from "../redux/store";
import { User as UserIcon, Mail, Shield, ArrowLeft } from "lucide-react";
import BreadCrumb from "../components/ui/BreadCrumb";
import type { User } from "../types/user";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.value.data);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<Partial<User>>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age ?? undefined,
    course: user?.course || "",
    profilePicture: user?.profilePicture || "",
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (user.roles === "student") {
        await axios.put("/student/me", {
          profilePicture: formData.profilePicture,
        });
      } else {
        await axios.put("/admin/profile", formData);
      }

      alert("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb title="My Profile" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-900 mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="h-24 bg-purple-900" />

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex items-end space-x-5 -mt-10 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white border-4 shadow-md flex items-center justify-center text-purple-900 text-2xl font-bold">
                {initials}
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>

                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full capitalize">
                  {user.roles}
                </span>
              </div>
            </div>

            {/* PROFILE FIELDS */}

            <div className="space-y-4">
              {/* First Name */}
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={user.roles === "student" || !isEditing}
                className="w-full border p-3 rounded-lg"
              />

              {/* Last Name */}
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={user.roles === "student" || !isEditing}
                className="w-full border p-3 rounded-lg"
              />

              {/* Age */}
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={user.roles === "student" || !isEditing}
                className="w-full border p-3 rounded-lg"
              />

              {/* Student only */}
              {user.roles === "student" && (
                <input
                  name="course"
                  value={formData.course}
                  disabled
                  className="w-full border p-3 rounded-lg bg-gray-100"
                />
              )}

              {/* Profile Picture */}
              <input
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Profile picture URL"
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Buttons */}

            <div className="flex gap-3 mt-6">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-900 text-white px-5 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}

              {isEditing && (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
