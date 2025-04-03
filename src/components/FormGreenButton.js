export default function FormGreenButton({ text, height, weight, size }) {
  return (
    <button 
      style={{
        fontWeight: weight,
        fontSize: size,
        height: height
      }} 
      className="~sm/l:~w-44/96 flex justify-center items-center bg-green rounded-md text-gray hover:bg-green-lighter"
    >
      {text}
    </button>
  );
}

  