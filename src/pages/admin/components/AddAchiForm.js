import { useState, useEffect } from "react";
import axios from "axios";

export default function AddAchievementForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    gameId: "",
    photoFile: null,
  });
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGamesLoading, setIsGamesLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Загрузка списка игр при монтировании компонента
  useEffect(() => {
    const fetchGames = async () => {
      setIsGamesLoading(true);
      try {
        const response = await axios.get(
          "https://localhost:7192/api/admin/games",
          {
            withCredentials: true,
          },
        );
        setGames(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке игр:", error);
        setError("Не удалось загрузить список игр");
      } finally {
        setIsGamesLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({ ...prev, photoFile: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!form.photoFile) {
      setError("Фотография обязательна");
      setIsLoading(false);
      return;
    }

    if (!form.gameId) {
      setError("Необходимо выбрать игру");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Title", form.title);
    formData.append("Description", form.description);
    formData.append("GameId", form.gameId);
    formData.append("Photo", form.photoFile);

    try {
      const response = await axios.post(
        "https://localhost:7192/api/admin/achievements/add-achievement",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess(`Ачивка успешно добавлена!`);
      setForm({
        title: "",
        description: "",
        gameId: "",
        photoFile: null,
      });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Ошибка при добавлении ачивки");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black">Добавить ачивку</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label className="block mb-1 font-medium text-black">Название</label>
          <input
            name="title"
            value={form.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Описание</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Игра</label>
          {isGamesLoading ? (
            <p>Загрузка списка игр...</p>
          ) : (
            <select
              name="gameId"
              value={form.gameId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Выберите игру</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">
            Иконка ачивки
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          {form.photoFile && (
            <p className="mt-1 text-sm text-gray-600">
              Выбрано: {form.photoFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isGamesLoading}
          className={`w-full py-2 px-4 rounded text-white ${
            isLoading || isGamesLoading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Добавление..." : "Добавить ачивку"}
        </button>
      </form>
    </div>
  );
}
