import { useState } from "react";
import axios from "axios";

export default function AddNewsForm() {
  const [form, setForm] = useState({
    title: "",
    photoFile: null,
    publishedDate: new Date().toISOString().split("T")[0], // текущая дата по умолчанию
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

    if (!form.photoFile) {
      setError("Фотография обязательна");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Title", form.title);
    formData.append("PublishedDate", form.publishedDate);
    formData.append("PhotoFile", form.photoFile);

    try {
      const response = await axios.post(
        "https://localhost:7192/api/admin/news/add-news",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert(`Новость успешно добавлена! ID: ${response.data.id}`);
      setForm({
        title: "",
        photoFile: null,
        publishedDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Ошибка при добавлении новости");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black">Добавить новость</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label className="block mb-1 font-medium text-black">Заголовок</label>
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
            Дата публикации
          </label>
          <input
            name="publishedDate"
            type="date"
            value={form.publishedDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-black">
            Фотография
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
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded text-white ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Добавление..." : "Добавить новость"}
        </button>
      </form>
    </div>
  );
}
