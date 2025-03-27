export default function GreenButton({ text, width, height }) {
    return (
      <button style={{ width: width, height: height }} className="bg-green rounded-md text-gray">
        {text}
      </button>
    );
}
  