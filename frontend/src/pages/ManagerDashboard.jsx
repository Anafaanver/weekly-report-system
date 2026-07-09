import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-700 text-white p-5 flex justify-between">
        <h1 className="text-2xl font-bold">
          Manager Dashboard
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

        <p className="mt-2">
          Role : {user?.role}
        </p>

        <div className="grid grid-cols-4 gap-5 mt-8">

          <div className="bg-white p-6 rounded shadow">
            <h3>Total Employees</h3>
            <h1 className="text-4xl font-bold mt-3">12</h1>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3>Reports Submitted</h3>
            <h1 className="text-4xl font-bold mt-3">35</h1>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3>Projects</h3>
            <h1 className="text-4xl font-bold mt-3">7</h1>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3>Pending Reports</h3>
            <h1 className="text-4xl font-bold mt-3">4</h1>
          </div>

        </div>
      </div>
    </div>
  );
}