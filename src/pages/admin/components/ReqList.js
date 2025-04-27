import { useEffect, useState } from "react";
import axios from "axios";

export default function ReqList() {
  const [requirements, setRequirements] = useState({
    min: [],
    rec: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("min");
  const [deletingId, setDeletingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      setLoading(true);
      setError("");
      const [minResponse, recResponse] = await Promise.all([
        axios.get("https://localhost:7192/api/admin/reqs/minreqs", {
          withCredentials: true,
        }),
        axios.get("https://localhost:7192/api/admin/reqs/recreqs", {
          withCredentials: true,
        }),
      ]);

      setRequirements({
        min: minResponse.data,
        rec: recResponse.data,
      });
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setError("Не удалось загрузить требования");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Вы уверены, что хотите удалить эти требования?"))
      return;

    try {
      setDeletingId(id);
      setError("");
      setSuccessMessage("");

      const endpoint =
        type === "min"
          ? `https://localhost:7192/api/admin/reqs/min/${id}`
          : `https://localhost:7192/api/admin/reqs/rec/${id}`;

      const response = await axios.delete(endpoint);

      if (response.status === 200 || response.status === 204) {
        setSuccessMessage("Требования успешно удалены!");
        setRequirements((prev) => ({
          ...prev,
          [type]: prev[type].filter((req) => req.id !== id),
        }));
      } else {
        throw new Error("Неизвестный статус ответа");
      }
    } catch (err) {
      console.error("Ошибка удаления:", err);
      setError(err.response?.data?.message || "Ошибка при удалении требований");
    } finally {
      setDeletingId(null);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  const RequirementCard = ({ req, type }) => (
    <div
      key={req.id}
      className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-purple-600">OS:</span>
            <span className="text-gray-700">{req.os || "-"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-purple-600">CPU:</span>
            <span className="text-gray-700">{req.processor || "-"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-purple-600">RAM:</span>
            <span className="text-gray-700">{req.memory} GB</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-purple-600">GPU:</span>
            <span className="text-gray-700">{req.graphics || "-"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-purple-600">Storage:</span>
            <span className="text-gray-700">{req.storage} GB</span>
          </div>
          {req.device && (
            <div className="flex items-center">
              <span className="font-semibold mr-2 text-purple-600">
                Devices:
              </span>
              <span className="text-gray-700">{req.device}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => handleDelete(req.id, type)}
          disabled={deletingId === req.id}
          className={`px-3 py-1 rounded-md flex items-center ${
            deletingId === req.id
              ? "bg-gray-300 text-gray-600"
              : "bg-red-500 hover:bg-red-600 text-white"
          } transition-colors`}
        >
          {deletingId === req.id ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Удаление...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Удалить
            </>
          )}
        </button>
      </div>
    </div>
  );

  if (loading && !deletingId) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="flex justify-center items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Загрузка требований...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "600px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Системные требования
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {successMessage}
        </div>
      )}

      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("min")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "min"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Минимальные
        </button>
        <button
          onClick={() => setActiveTab("rec")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "rec"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Рекомендуемые
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {activeTab === "min" ? (
          <div>
            {requirements.min.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-2">Нет минимальных требований</p>
              </div>
            ) : (
              requirements.min.map((req) => (
                <RequirementCard key={req.id} req={req} type="min" />
              ))
            )}
          </div>
        ) : (
          <div>
            {requirements.rec.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-2">Нет рекомендуемых требований</p>
              </div>
            ) : (
              requirements.rec.map((req) => (
                <RequirementCard key={req.id} req={req} type="rec" />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
