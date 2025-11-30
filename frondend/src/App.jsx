import React, { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { employeeAPI } from "./services/api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data);
    } catch (error) {
      showNotification("Failed to fetch employees", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreate = async (employeeData) => {
    try {
      await employeeAPI.create(employeeData);
      await fetchEmployees();
      setShowForm(false);
      showNotification("Employee created successfully!");
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to create employee",
        "error"
      );
    }
  };

  const handleUpdate = async (employeeData) => {
    try {
      await employeeAPI.update(currentEmployee._id, employeeData);
      await fetchEmployees();
      setCurrentEmployee(null);
      setShowForm(false);
      showNotification("Employee updated successfully!");
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to update employee",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeAPI.delete(id);
        await fetchEmployees();
        showNotification("Employee deleted successfully!");
      } catch (error) {
        showNotification("Failed to delete employee", "error");
      }
    }
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setShowForm(true);
  };

  const handleCancel = () => {
    setCurrentEmployee(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Notification */}
      {notification.show && (
        <div
          className={`fixed top-6 right-6 z-50 max-w-sm w-full p-4 rounded-xl shadow-2xl border-l-4 ${
            notification.type === "error"
              ? "bg-red-50 border-red-500 text-red-800"
              : "bg-emerald-50 border-emerald-500 text-emerald-800"
          } transform transition-all duration-500 ease-in-out ${
            notification.show
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                notification.type === "error" ? "bg-red-100" : "bg-emerald-100"
              }`}
            >
              {notification.type === "error" ? (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="container mx-auto px-4 py-12 relative">
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl shadow-blue-500/25 mb-6 transform hover:scale-105 transition-transform duration-300">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>

            <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Employee
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Management
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Streamline your workforce management with our intuitive platform.
              <span className="block text-gray-500 text-lg mt-2">
                Add, edit, and manage your team members effortlessly.
              </span>
            </p>
          </header>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            {!showForm ? (
              <div className="space-y-8">
                {/* Enhanced Action Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Team Directory
                    </h2>
                    <p className="text-gray-600">
                      {employees.length}{" "}
                      {employees.length === 1 ? "employee" : "employees"} in
                      your organization
                    </p>
                  </div>

                  <button
                    onClick={() => setShowForm(true)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  >
                    <svg
                      className="w-5 h-5 mr-3 transition-transform group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add New Employee
                  </button>
                </div>

                {/* Employee List */}
                <div className="transform transition-all duration-500 ease-out">
                  <EmployeeList
                    employees={employees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    loading={loading}
                  />
                </div>
              </div>
            ) : (
              <div className="transform transition-all duration-500 ease-out">
                <EmployeeForm
                  employee={currentEmployee}
                  onSubmit={currentEmployee ? handleUpdate : handleCreate}
                  onCancel={handleCancel}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-white/50 border-t border-gray-200/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>Employee Management System © 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
