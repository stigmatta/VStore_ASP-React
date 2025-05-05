export default function ActionGrayButton({ title, onClick }) {
  return (
    <button onClick={onClick} className="opacity-80 font-medium">
      {title}
    </button>
  );
}
