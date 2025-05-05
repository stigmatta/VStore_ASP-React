export default function GreenButton({
  width,
  height,
  text,
  weight = 500,
  fontSize,
  className = "",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontWeight: weight,
        width: width,
        height: height,
        fontSize: fontSize,
      }}
      className={`text-gray rounded bg-green hover:bg-green-lighter ${className}`}
    >
      {text}
    </button>
  );
}
