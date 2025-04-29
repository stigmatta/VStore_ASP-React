import { useEffect, useState } from "react";
import axios from "axios";

export default function GamesList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7192/api/admin/games",
        );
        setGames(response.data);
      } catch (error) {
        console.error("Ошибка при получении списка игр:", error);
        setError("Не удалось загрузить список игр");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту игру?")) return;

    setDeleteLoading(id);
    try {
      await axios.delete(`https://localhost:7192/api/admin/games/${id}`);
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении игры:", error);
      setError("Не удалось удалить игру");
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price, discount) => {
    if (discount > 0) {
      return (
        <div className="flex items-center space-x-2">
          <span className="line-through text-gray-400">
            ${price.toFixed(2)}
          </span>
          <span className="text-green-600 font-bold">
            ${(price * (1 - discount / 100)).toFixed(2)}
          </span>
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
            -{discount}%
          </span>
        </div>
      );
    }
    return (
      <span className="text-green-600 font-semibold">${price.toFixed(2)}</span>
    );
  };

  if (loading) {
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Список игр</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          Всего игр: {games.length}
        </span>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-4 text-gray-600">Нет доступных игр</div>
      ) : (
        <div
          className="space-y-4"
          style={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          {games.map((game) => (
            <div
              key={game.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={`https://localhost:7192${game.logo}`}
                    alt={game.title}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/placeholder-game.jpg";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-black truncate">
                    {game.title}
                  </h3>
                  <p className="text-gray-600">{game.developer}</p>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium text-black">
                        Дата выхода:
                      </span>{" "}
                      <span className="text-purple-600">
                        {formatDate(game.releaseDate)}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-black">Цена:</span>{" "}
                      {formatPrice(game.price, game.discount)}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(game.id)}
                    disabled={deleteLoading === game.id}
                    className={`px-3 py-1 rounded text-sm ${
                      deleteLoading === game.id
                        ? "bg-gray-400 text-white"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {deleteLoading === game.id ? "Удаление..." : "Удалить"}
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
