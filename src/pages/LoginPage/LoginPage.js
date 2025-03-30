import { motion } from 'framer-motion';

import './LoginPage.css'
import BackArrow from '../../components/BackArrow';
import LoginForm from '../../components/LoginForm';


export default function LoginPage() {
  return (
    <div className="login-page h-screen w-full">
      <BackArrow/>
      <div className='w-full h-full flex items-center justify-center'>
        <motion.div
          initial={{ y: "-500%" }}
          animate={{ y: "0%" }} 
          transition={{ type: 'spring', bounce: 0.4 }}
        >
         <LoginForm/> 
        </motion.div>
      </div>

    </div>
  );
}
