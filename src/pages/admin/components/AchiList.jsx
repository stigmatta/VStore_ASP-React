import { useEffect, useState } from "react";
import axios from "axios";

export default function AchievementsList() {
  const [achievements, setAchievements] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Загрузка игр
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7192/api/admin/games",
          { withCredentials: true },
        );
        console.log("Игры:", response.data);
        setGames(response.data);
      } catch (error) {
        console.error("Ошибка при получении списка игр:", error);
        setError("Не удалось загрузить список игр");
      } finally {
        setGamesLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Загрузка ачивок при выборе игры
  useEffect(() => {
    if (!selectedGameId) return;

    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7192/api/admin/achievements/game-${selectedGameId}`,
          { withCredentials: true },
        );
        setAchievements(response.data);
      } catch (error) {
        console.error("Ошибка при получении ачивок:", error);
        setError("Не удалось загрузить ачивки");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [selectedGameId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту ачивку?")) return;

    setDeleteLoading(id);
    try {
      await axios.delete(
        `https://localhost:7192/api/admin/achievements/${id}`,
        { withCredentials: true },
      );
      setAchievements((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении ачивки:", error);
      setError("Не удалось удалить ачивку");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleGameChange = (e) => {
    setSelectedGameId(e.target.value);
    setError("");
  };

  if (gamesLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        Загрузка списка игр...
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
      <h2 className="text-2xl font-bold mb-6 text-black">Список ачивок</h2>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-black">
          Выберите игру:
        </label>
        {games.length > 0 ? (
          <select
            value={selectedGameId}
            onChange={handleGameChange}
            className="w-full p-2 border rounded text-black"
            disabled={loading}
          >
            <option value="">-- Выберите игру --</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        ) : (
          <div className="text-gray-500 text-sm">Нет доступных игр</div>
        )}
      </div>

      {loading && selectedGameId ? (
        <div className="text-center py-4 text-gray-600">Загрузка ачивок...</div>
      ) : achievements.length === 0 && selectedGameId ? (
        <div className="text-center py-4 text-gray-600">
          Нет ачивок для выбранной игры
        </div>
      ) : (
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={`https://localhost:7192${achievement.photo}`}
                    alt={achievement.title}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/placeholder-achievement.png";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-black">
                    {achievement.title}
                  </h3>
                  {achievement.description && (
                    <p className="mt-1 text-gray-600">
                      {achievement.description}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    disabled={deleteLoading === achievement.id}
                    className={`px-3 py-1 rounded text-sm ${
                      deleteLoading === achievement.id
                        ? "bg-gray-400 text-white"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {deleteLoading === achievement.id
                      ? "Удаление..."
                      : "Удалить"}
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
