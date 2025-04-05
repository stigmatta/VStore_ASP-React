import BackArrow from '../../components/BackArrow';
import RegForm from '../../components/RegForm';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function RegistrationPage() {
  const windowWidth = useWindowWidth();
  return (
    <div className="form-page h-fit l:h-screen w-full">
      <BackArrow/>
      <div className='w-full h-full flex justify-center
                      l:items-center'>

        {windowWidth > 1250 ? <RegForm initial={0.8} final={1} /> : <RegForm/>}

      </div>

    </div>
  );
}