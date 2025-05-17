import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import GreenButton from "./GreenButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditModal({ user, closeModal, onUpdate }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    username: user.username,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = new FormData();

      if (file) payload.append("Avatar", file);
      if (formData.username !== user.username) {
        payload.append("Username", formData.username);
      }
      if (formData.newPassword) {
        payload.append("OldPassword", formData.oldPassword);
        payload.append("NewPassword", formData.newPassword);
      }

      const response = await fetch(
        "https://localhost:7192/api/update-profile",
        {
          method: "POST",
          body: payload,
          credentials: "include",
        },
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Request failed");
      }

      const result = await response.json();
      toast.success("Profile updated!");
      onUpdate(result);
      closeModal();
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className="p-6 bg-gray-light rounded-lg">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-formTitle">{user.username} Info</h1>
        <X
          className="hoverSvg hover:cursor-pointer"
          onClick={closeModal}
          size={24}
        />
      </div>

      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <ProfilePicture size={"177px"} src={previewUrl || user.avatar} />

        <div onClick={handleUploadClick}>
          <GreenButton
            text="Upload new image"
            width="full"
            fontSize="24px"
            className="px-4 mt-3"
            type="button"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </div>

        <label className="flex flex-col text-title mt-5 w-full">
          <span>New username</span>
          <input
            className="bg-gray-lighterInput rounded-xl px-2 w-full"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>

        <label className="flex flex-col text-title mt-5 w-full">
          <span>Old password</span>
          <input
            className="bg-gray-lighterInput rounded-xl px-2 w-full"
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            placeholder="Leave empty if not changing"
          />
        </label>

        <label className="flex flex-col text-title mt-5 w-full">
          <span>New password</span>
          <input
            className="bg-gray-lighterInput rounded-xl px-2 w-full"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Leave empty if not changing"
          />
        </label>

        <label className="flex flex-col text-title mt-5 w-full">
          <span>Confirm password</span>
          <input
            className="bg-gray-lighterInput rounded-xl px-2 w-full"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Leave empty if not changing"
          />
        </label>

        <button className="self-start mt-5" type="submit" disabled={isLoading}>
          <div className="text-gray rounded bg-green hover:bg-green-lighter rounded-xl px-3 py-2 text-[36px]">
            {isLoading ? "Saving..." : "Save"}
          </div>
        </button>
      </form>
    </div>
  );
}
