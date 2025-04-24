import { useState, useEffect } from "react";
import axios from "axios";

export default function AddGameForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    discount: 0,
    logoFile: null,
    developer: "",
    recommendedRequirementId: "",
    minimumRequirementId: "",
    releaseDate: "",
    galleryFiles: [],
  });

  const [minimumRequirements, setMinimumRequirements] = useState([]);
  const [recommendedRequirements, setRecommendedRequirements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const [minResponse, recResponse] = await Promise.all([
          axios.get("https://localhost:7192/api/admin/minreqs"),
          axios.get("https://localhost:7192/api/admin/recreqs"),
        ]);

        setMinimumRequirements(minResponse.data);
        setRecommendedRequirements(recResponse.data);
      } catch (error) {
        console.error("Ошибка при получении требований:", error);
        setError("Не удалось загрузить требования");
      }
    };

    fetchRequirements();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setForm((prev) => ({
        ...prev,
        galleryFiles: [...prev.galleryFiles, ...files],
      }));
    }
  };

  const handleLogoChange = (e) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({ ...prev, logoFile: e.target.files[0] }));
    }
  };

  const removeFile = (index) => {
    setForm((prev) => ({
      ...prev,
      galleryFiles: prev.galleryFiles.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!form.logoFile) {
      setError("Логотип обязателен");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Title", form.title);
    formData.append("Description", form.description);
    formData.append("Price", form.price);
    formData.append("Discount", form.discount);
    formData.append("Developer", form.developer);
    formData.append("RecommendedRequirementId", form.recommendedRequirementId);
    formData.append("MinimumRequirementId", form.minimumRequirementId);
    formData.append("ReleaseDate", form.releaseDate);
    formData.append("LogoFile", form.logoFile);

    form.galleryFiles.forEach((file) => {
      formData.append("GalleryFiles", file);
    });

    try {
      const response = await axios.post(
        "https://localhost:7192/api/admin/add-game",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert(`Игра успешно добавлена! ID: ${response.data.gameId}`);
      setForm({
        title: "",
        description: "",
        price: 0,
        discount: 0,
        logoFile: null,
        developer: "",
        recommendedRequirementId: "",
        minimumRequirementId: "",
        releaseDate: "",
        galleryFiles: [],
      });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Ошибка при добавлении игры");
    } finally {
      setIsLoading(false);
    }
  };

  const formatRequirements = (req) => {
    if (!req) return "";
    return `OS: ${req.os}, CPU: ${req.processor}, RAM: ${req.memory}GB, GPU: ${req.graphics}, Storage: ${req.storage}GB`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Добавить новую игру
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-black">
              Название
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Разработчик
            </label>
            <input
              name="developer"
              value={form.developer}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">Описание</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded h-24 text-black"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-black">Цена</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Скидка (%)
            </label>
            <input
              name="discount"
              type="number"
              value={form.discount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-black">
              Минимальные требования
            </label>
            <select
              name="minimumRequirementId"
              value={form.minimumRequirementId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Выберите...</option>
              {minimumRequirements.map((req) => (
                <option key={req.id} value={req.id} className="text-black">
                  {formatRequirements(req)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Рекомендуемые требования
            </label>
            <select
              name="recommendedRequirementId"
              value={form.recommendedRequirementId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Выберите...</option>
              {recommendedRequirements.map((req) => (
                <option key={req.id} value={req.id} className="text-black">
                  {formatRequirements(req)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">
            Дата выхода
          </label>
          <input
            name="releaseDate"
            type="date"
            value={form.releaseDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">
            Логотип игры
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          {form.logoFile && (
            <p className="mt-1 text-sm text-gray-600">
              Выбран: {form.logoFile.name}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">
            Галерея (изображения/видео)
          </label>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded text-black"
          />

          <div className="mt-2 space-y-2">
            {form.galleryFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm text-black">
                  {file.name} (
                  {file.type.startsWith("image") ? "Изображение" : "Видео"})
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded text-white ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {isLoading ? "Добавление..." : "Добавить игру"}
        </button>
      </form>
    </div>
  );
}
