export default function GreenButton({ width, height, text, weight = 500 }) {
    return (
        <button
            style={{ fontWeight: weight, width: width, height: height }}
            className="text-gray rounded bg-green hover:bg-green-lighter"
        >
            {text}
        </button>
    );
}
