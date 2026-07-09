import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MemberDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-blue-700 text-white p-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Weekly Report System
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold">
          Welcome {user?.name}
        </h2>

        <p className="mt-2 text-gray-600">
          Role : {user?.role}
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold">
              Weekly Reports
            </h3>

            <p className="text-gray-500 mt-2">
              Submit your weekly work report.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold">
              Assigned Projects
            </h3>

            <p className="text-gray-500 mt-2">
              View your assigned projects.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold">
              AI Summary
            </h3>

            <p className="text-gray-500 mt-2">
              Generate AI weekly summaries.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}