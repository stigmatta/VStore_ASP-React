export default function LabelInput({
  label,
  mt,
  width = "90%",
  type = "text",
  error,
  ...rest
}) {
  return (
    <div
      className="flex flex-col min-w-[100%]"
      style={{ marginTop: mt, width: width }}
    >
      <label>{label}</label>
      <input
        className={`bg-gray-formInput rounded-md h-14 px-3 border ${
          error ? "border-red-500" : "border-transparent"
        }`}
        type={type}
        {...rest}
      />
      {error && <span className="text-red text-sm mt-1">{error}</span>}
    </div>
  );
}
