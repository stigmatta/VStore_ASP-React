import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import GreenButton from "./GreenButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSnackbar from "../hooks/useSnackbar";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";

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
  const { openSnackbar, isSuccess, snackMessage, createSnackbar, handleClose } =
    useSnackbar();

  const validateForm = () => {
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      createSnackbar(false, "New passwords don't match");
      return false;
    }
    if (formData.newPassword && !formData.oldPassword) {
      createSnackbar(false, "Please enter your old password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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

      const response = await axios.post(
        "https://localhost:7192/api/update-profile",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      createSnackbar(true, "Profile updated successfully!");
      onUpdate(response.data);
      closeModal();
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to update profile";
      createSnackbar(false, errorMessage);
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
      <CustomSnackbar
        close={handleClose}
        isError={!isSuccess}
        message={snackMessage}
        open={openSnackbar}
      />
      <div className="flex justify-between w-full items-center">
        <h1 className="text-formTitle">{user.username} Info</h1>
        <X
          className="hoverSvg hover:cursor-pointer"
          onClick={closeModal}
          size={24}
        />
      </div>

      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <ProfilePicture size={"177px"} src={previewUrl || user.photo} />

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
            required
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
            placeholder="Required if changing password"
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
          <div
            className={`text-gray rounded ${isLoading ? "bg-green-lighter" : "bg-green hover:bg-green-lighter"} rounded-xl px-3 py-2 text-[36px]`}
          >
            {isLoading ? "Saving..." : "Save"}
          </div>
        </button>
      </form>
    </div>
  );
}
