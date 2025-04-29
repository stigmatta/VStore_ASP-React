const useGetImage = (path) => {
  if (!path) return "/placeholder.jpg";
  return `https://localhost:7192${path}`;
};

export default useGetImage;
