import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { RootState } from "../redux/store";
import { Pencil, Check, X } from "lucide-react";
import BreadCrumb from "../components/ui/BreadCrumb";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice";
import api from "../api/api";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.value.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    age: number | undefined;
    course: string;
    profilePicture: File | string;
  }>({
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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const profilePicUrl =
    user.profilePicture?.startsWith("https:/") &&
    !user.profilePicture?.startsWith("https://")
      ? user.profilePicture.replace("https:/", "https://")
      : user.profilePicture;
  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("age", String(formData.age ?? ""));
      form.append("course", formData.course);

      if (formData.profilePicture instanceof File) {
        form.append("profilePicture", formData.profilePicture);
      }
      const apiUrl =
        user.roles === "student"
          ? "/api/student/profile"
          : "/api/admin/profile";

      const res = await api.put(apiUrl, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = {
        ...user,
        ...res.data.data,
      };
      dispatch(login(updatedUser));

      alert("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile. Please try again.");
    }
  };

  const fields = [
    {
      label: "First Name",
      name: "firstName",
      value: formData.firstName,
      disabled: user.roles === "student",
    },
    {
      label: "Last Name",
      name: "lastName",
      value: formData.lastName,
      disabled: user.roles === "student",
    },
    {
      label: "Age",
      name: "age",
      value: formData.age,
      disabled: user.roles === "student",
    },
    ...(user.roles === "student"
      ? [
          {
            label: "Course",
            name: "course",
            value: formData.course,
            disabled: true,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb title="My Profile" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-purple-900" />

          <div className="px-8 pb-8">
            {/* Avatar + name — centered */}
            <div className="flex flex-col items-center -mt-12 mb-8 text-center">
              <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-purple-900 text-2xl font-bold">
                {profilePicUrl ? (
                  <img
                    src={profilePicUrl} // changed from user.profilePicture
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-syne">{initials}</span>
                )}
              </div>
              <h1 className="mt-3 text-xl font-bold text-gray-900 font-syne">
                {user.firstName} {user.lastName}
              </h1>
              <span className="mt-1.5 inline-block bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-medium capitalize">
                {user.roles}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-6" />

            {/* Fields */}
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={field.value ?? ""}
                    onChange={handleChange}
                    disabled={field.disabled || !isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all ${
                      field.disabled || !isEditing
                        ? "bg-gray-50 border-gray-100 text-gray-500 cursor-default"
                        : "bg-white border-gray-200 text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    }`}
                  />
                </div>
              ))}

              {/* Profile picture upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Profile Picture
                </label>
                {isEditing ? (
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-purple-300 hover:text-purple-900 transition-colors">
                    {formData.profilePicture instanceof File
                      ? "Change Photo"
                      : "Add Photo"}
                    <input
                      type="file"
                      accept="image/jpeg, image/jpg, image/png"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormData({
                            ...formData,
                            profilePicture: e.target.files[0] as any,
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Enable editing to change photo
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-8">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-purple-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-800 transition-colors"
                >
                  <Pencil size={14} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-purple-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-purple-800 transition-colors"
                  >
                    <Check size={14} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <X size={14} />
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
