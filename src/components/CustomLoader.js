import { BounceLoader } from "react-spinners";

export default function CustomLoader() {
  return (
    <div className="flex justify-center h-screen items-center blur-md">
      <BounceLoader />
    </div>
  );
}
