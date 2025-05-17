import useGetImage from "../hooks/useGetImage";
import DefaultImage from "../images/user-profile.jpg";
import { useMemo } from "react";

export default function ProfilePicture({ size, user }) {
  const avatar = useGetImage(user?.photo);

  const imageSrc = useMemo(() => {
    if (!user?.photo) return DefaultImage;

    if (user.photo.startsWith("http")) {
      return user.photo;
    } else if (user.photo.startsWith("/")) {
      return `https://localhost:7192${user.photo}`;
    }
    return avatar || DefaultImage;
  }, [user?.photo, avatar]);

  return (
    <img
      style={{ width: size, height: size }}
      className="border border-solid border-green object-cover"
      src={imageSrc}
      alt="Profile"
    />
  );
}
