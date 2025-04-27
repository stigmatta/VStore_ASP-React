import { useState } from "react";
import axios from "axios";

export default function AddReqForm() {
  const [form, setForm] = useState({
    os: "",
    processor: "",
    memory: 8,
    graphics: "",
    storage: 50,
    device: "",
    type: "min",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "memory" || name === "storage" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const endpoint =
        form.type === "min"
          ? "https://localhost:7192/api/admin/reqs/add-minreq"
          : "https://localhost:7192/api/admin/reqs/add-recreq";

      const requirement = {
        os: form.os,
        processor: form.processor,
        memory: form.memory,
        graphics: form.graphics,
        storage: form.storage,
        device: form.device,
      };

      await axios.post(endpoint, requirement);

      alert("Требования успешно добавлены!");
      setForm({
        os: "",
        processor: "",
        memory: 8,
        graphics: "",
        storage: 50,
        device: "",
        type: "min",
      });
    } catch (err) {
      console.error(err);
      setError("Ошибка при добавлении требований");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Добавить системные требования
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div className=" flex space-x-4 mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="min"
              checked={form.type === "min"}
              onChange={() => setForm((prev) => ({ ...prev, type: "min" }))}
              className="form-radio"
            />
            <span className="ml-2">Минимальные</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="rec"
              checked={form.type === "rec"}
              onChange={() => setForm((prev) => ({ ...prev, type: "rec" }))}
              className="form-radio"
            />
            <span className="ml-2">Рекомендуемые</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-black">
              Операционная система
            </label>
            <input
              name="os"
              value={form.os}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Процессор
            </label>
            <input
              name="processor"
              value={form.processor}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-black">
              Оперативная память (GB)
            </label>
            <input
              name="memory"
              type="number"
              value={form.memory}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Видеокарта
            </label>
            <input
              name="graphics"
              value={form.graphics}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-black">
              Место на диске (GB)
            </label>
            <input
              name="storage"
              type="number"
              value={form.storage}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Дополнительные устройства
            </label>
            <input
              name="device"
              value={form.device}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded text-white ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Сохранение..." : "Добавить требования"}
        </button>
      </form>
    </div>
  );
}
