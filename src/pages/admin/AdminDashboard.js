import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import GamesSection from "./sections/GamesSection";
import NewsSection from "./sections/NewsSection";
import ReqsSection from "./sections/ReqsSection";
import { useNavigate } from "react-router-dom";
import AchiSection from "./sections/AchiSection";

export default function AdminDashboard() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("https://localhost:7192/api/admin", {
          withCredentials: true,
        });
      } catch (error) {
        if (error.response?.status === 401) {
          setError("401: Unauthorized");
        } else {
          console.error("API Error:", error);
          setError("An unexpected error occurred");
        }
      }
    };

    fetchData();
  }, []);
  const [activeSection, setActiveSection] = useState("games");
  if (error !== "") return <PageTitle title={error}></PageTitle>;
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed inset-y-0 left-0 w-56 bg-white shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">Админ-панель</h1>
        </div>
        <nav className="p-2">
          <button
            onClick={() => setActiveSection("games")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              activeSection === "games"
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Игры
          </button>
          <button
            onClick={() => setActiveSection("news")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              activeSection === "news"
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Новости
          </button>
          <button
            onClick={() => setActiveSection("reqs")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              activeSection === "reqs"
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Требования
          </button>
          <button
            onClick={() => setActiveSection("achi")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              activeSection === "reqs"
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Ачивки
          </button>
        </nav>
      </div>

      <div className="ml-56 p-6">
        {activeSection === "games" && <GamesSection />}
        {activeSection === "news" && <NewsSection />}
        {activeSection === "reqs" && <ReqsSection />}
        {activeSection === "achi" && <AchiSection />}
      </div>
      <button
        onClick={handleNavigate}
        className={"text-black text-title absolute right-0 top-0 mr-5 mt-5"}
      >
        X
      </button>
    </div>
  );
}
