export default function GreenButton({ width, height, text, weight = 500, fontSize }) {
    return (
        <button
            style={{ fontWeight: weight, width: width, height: height, fontSize: fontSize}}
            className="text-gray rounded bg-green hover:bg-green-lighter"
        >
            {text}
        </button>
    );
}
