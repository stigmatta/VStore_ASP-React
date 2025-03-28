export default function GrayButton({ text, width, height }) {
    return (
      <button style={{ width: width, height: height }} className="bg-gray-light rounded-md text-white hover:bg-gray-lighterInput">
        {text}
      </button>
    );
  }
  