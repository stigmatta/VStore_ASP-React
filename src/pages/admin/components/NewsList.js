import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7192/api/admin/news",
          { withCredentials: true },
        );
        setNews(response.data);
      } catch (error) {
        console.error("Ошибка при получении списка новостей:", error);
        setError("Не удалось загрузить список новостей");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту новость?")) return;

    setDeleteLoading(id);
    try {
      await axios.delete(`https://localhost:7192/api/admin/news/${id}`);
      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении новости:", error);
      setError("Не удалось удалить новость");
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        Загрузка списка новостей...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black">Список новостей</h2>

      {news.length === 0 ? (
        <div className="text-center py-4 text-gray-600">
          Нет доступных новостей
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={`https://localhost:7192${item.photo}`}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/placeholder-news.jpg";
                      console.error("Error loading image:", e.target.src);
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-black truncate">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium text-black">
                        Дата публикации:
                      </span>{" "}
                      <span className="text-purple-600 font-semibold">
                        {formatDate(item.publishedDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleteLoading === item.id}
                    className={`px-3 py-1 rounded text-sm ${
                      deleteLoading === item.id
                        ? "bg-gray-400 text-white"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {deleteLoading === item.id ? "Удаление..." : "Удалить"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
