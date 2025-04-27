import { useNavigate } from "react-router-dom";

export default function BackArrow() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div
      onClick={handleGoBack}
      className="absolute hoverSvg m-5 hover:cursor-pointer"
    >
      <svg
        width="14"
        height="24"
        viewBox="0 0 14 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 12L12 22"
          stroke="#EEEEEE"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
