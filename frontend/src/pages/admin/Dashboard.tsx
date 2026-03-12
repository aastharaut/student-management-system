import { useEffect, useState } from "react";
import api from "../../api/api";
import BreadCrumb from "../../components/ui/BreadCrumb";

interface CourseCount {
  course: string;
  count: number;
}

interface DashboardData {
  totalStudents: number;
  studentsPerCourse: CourseCount[];
}

const COURSE_COLORS = [
  { bg: "#F3F0FF", bar: "#7C3AED", text: "#5B21B6" },
  { bg: "#EFF6FF", bar: "#3B82F6", text: "#1D4ED8" },
  { bg: "#F0FDF4", bar: "#22C55E", text: "#15803D" },
  { bg: "#FFF7ED", bar: "#F97316", text: "#C2410C" },
  { bg: "#FFF1F2", bar: "#F43F5E", text: "#BE123C" },
  { bg: "#F0FDFA", bar: "#14B8A6", text: "#0F766E" },
];

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/api/admin/dashboard")
      .then((res) => {
        if (res.data.success) {
          const normalized: DashboardData = {
            totalStudents: res.data.totalStudents,
            studentsPerCourse: (res.data.studentsPerCourse || []).map(
              (c: any) => ({ course: c.course, count: Number(c.count) }),
            ),
          };
          setData(normalized);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const maxCount = data
    ? Math.max(...data.studentsPerCourse.map((c) => c.count), 1)
    : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumb title="Dashboard" />

      <div className="p-6">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-900 rounded-full animate-spin" />
              Loading dashboard…
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-400">
                Failed to load dashboard data.
              </p>
            </div>
          </div>
        )}

        {data && (
          <div className="space-y-5 max-w-4xl mx-auto">
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-purple-900 rounded-xl p-5 text-white">
                <p className="text-xs text-purple-300 mb-2">Total Students</p>
                <p className="text-4xl font-bold font-syne">
                  {data.totalStudents}
                </p>
                <p className="text-xs text-purple-300 mt-1">
                  Enrolled across all courses
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Courses</p>
                <p className="text-4xl font-bold text-gray-900 font-syne">
                  {data.studentsPerCourse.length}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Active course tracks
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Avg / Course</p>
                <p className="text-4xl font-bold text-gray-900 font-syne">
                  {data.studentsPerCourse.length > 0
                    ? Math.round(
                        data.totalStudents / data.studentsPerCourse.length,
                      )
                    : 0}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Students per course (avg)
                </p>
              </div>
            </div>

            {/* Course breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-5">
                Students per Course
              </h2>

              {data.studentsPerCourse.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                  No course data available.
                </p>
              ) : (
                <div className="space-y-4">
                  {data.studentsPerCourse
                    .slice()
                    .sort((a, b) => b.count - a.count)
                    .map((c, i) => {
                      const color = COURSE_COLORS[i % COURSE_COLORS.length];
                      const pct = Math.round((c.count / maxCount) * 100);
                      return (
                        <div key={c.course}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor: color.bg,
                                color: color.text,
                              }}
                            >
                              {c.course}
                            </span>
                            <span className="text-sm text-gray-600">
                              {c.count} student{c.count !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-1.5 rounded-full"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: color.bar,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
