import BackArrow from '../components/BackArrow';
import LoginForm from '../components/LoginForm';
import useWindowWidth from '../hooks/useWindowWidth';

export default function LoginPage() {
  const windowWidth = useWindowWidth();
  return (
    <div className="form-page h-fit l:h-screen w-full">
      <BackArrow/>
      <div className='w-full h-full flex justify-center
                      l:items-center'>
        <LoginForm />
      </div>

    </div>
  );
}
