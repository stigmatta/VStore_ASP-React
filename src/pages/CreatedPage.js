import BackArrow from '../components/BackArrow';
import CreatedForm from '../components/CreatedForm';
import useWindowWidth from '../hooks/useWindowWidth';

export default function CreatedPage() {
  const windowWidth = useWindowWidth();
  return (
    <div className="form-page h-fit l:h-screen w-full">
      <BackArrow/>
      <div className='w-full h-full flex justify-center
                      l:items-center'>

        {windowWidth > 1250 ? <CreatedForm initial={0.8} final={1} /> : <CreatedForm/>}

      </div>

    </div>
  );
}