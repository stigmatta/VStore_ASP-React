export default function Checkbox({ mt = "2rem" }) {
  return (
    <div
      style={{
        marginTop: mt,
      }}
      className="flex items-left w-[90%]"
    >
      <input
        id="link-checkbox"
        type="checkbox"
        value=""
        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="link-checkbox"
        className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
      >
        I am 13 years of age or older and agree to the terms of the Steam
        Subscriber Agreement and the Valve Privacy Policy.
      </label>
    </div>
  );
}
