export default function ProfilePicture({ size, src }) {
  return (
    <img
      style={{ width: size, height: size }}
      className="border border-solid border-green object-cover"
      src={src}
      alt="Profile"
    />
  );
}
