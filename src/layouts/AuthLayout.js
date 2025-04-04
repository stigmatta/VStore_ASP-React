import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center form-page">
      <Outlet />
    </div>
  );
};

export default AuthLayout;