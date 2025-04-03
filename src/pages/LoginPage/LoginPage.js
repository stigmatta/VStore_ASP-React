import './LoginPage.css'
import BackArrow from '../../components/BackArrow';
import LoginForm from '../../components/LoginForm';
import useWindowWidth from '../../hooks/useWindowWidth';


export default function LoginPage() {
  const windowWidth = useWindowWidth();
  return (
    <div className="form-page h-fit l:h-screen w-full">
      <BackArrow/>
      <div className='w-full h-full flex justify-center
                      l:items-center'>
        
        {windowWidth > 1250 ? <LoginForm initial={0.8} final={1} /> : <LoginForm/>}

        {/* <motion.div
          initial={{ y: "-250%" }}
          animate={{ y: "0%" }} 
          transition={{ type: 'spring', duration:.9, bounce: 0.4}}
        > */}

      </div>

    </div>
  );
}
