import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import GreenButton from "./GreenButton";

export default function EditModal({ user, closeModal }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
    <div className="p-6 bg-gray-light rounded-lg ">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-formTitle">{user.username} info</h1>
        <X
          className="hoverSvg hover:cursor-pointer"
          onClick={closeModal}
          size={24}
        />
      </div>

      <form className="flex flex-col w-full">
        <ProfilePicture size={"177px"} src={previewUrl || user.avatar} />

        <div onClick={handleUploadClick}>
          <GreenButton
            text="Upload new image"
            width="full"
            fontSize="24px"
            className="px-4 mt-3"
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
            type={"text"}
          />
        </label>

        <label className="flex flex-col text-title mt-5 w-full">
          <span>Old password</span>
          <input
            className="bg-gray-lighterInput rounded-xl px-2 w-full"
            type={"password"}
          />
        </label>

        <label className="flex flex-col text-title mt-5 w-full">
          <span className="">New password</span>
          <input
            className="bg-gray-lighterInput rounded-xl px-2 w-full"
            type={"password"}
          />
        </label>

        <label className="flex flex-col text-title mt-5 w-full">
          <span className="">Confirm password</span>
          <input
            className="bg-gray-lighterInput rounded-xl px-2 w-full"
            type={"password"}
          />
        </label>
        <button className="self-start mt-5" type="submit">
          <GreenButton
            text={"Save"}
            fontSize={"36px"}
            className={"rounded-xl px-3 py-2"}
          />
        </button>
      </form>
    </div>
  );
}
