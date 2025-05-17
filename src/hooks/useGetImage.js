import DefaultImage from "../images/user-profile.jpg";

const useGetImage = (path) => {
  if (!path) return DefaultImage;
  return `https://localhost:7192${path}`;
};

export default useGetImage;
