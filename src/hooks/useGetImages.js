const useGetImages = (arr) => {
  return arr.map((path) =>
    path ? `https://localhost:7192${path}` : "/placeholder.jpg",
  );
};

export default useGetImages;
