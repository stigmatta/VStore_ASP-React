import BackArrow from "../components/BackArrow";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="form-page h-fit l:h-screen w-full">
      <BackArrow />
      <div
        className="w-full h-full flex justify-center
                      l:items-center"
      >
        <LoginForm />
      </div>
    </div>
  );
}
