import GrayButton from './GrayButton';
import QrCode from '../images/qr_code.png'
import { Link } from 'react-router-dom';
import LabelInput from './LabelInput';
import GreenButton from './GreenButton';

import { motion } from 'framer-motion';

export default function LoginForm({initial = 1 ,final = 1}){
    return(
        <motion.div
            initial={{scale:initial}}
            whileHover={{ scale:final}}
            transition={{type:'spring',duration:.25,stiffness:100}}
        >
            <h1 className='mx-auto my-0 w-fit text-formTitle font-extrabold
                           l:mx-0'>Log in</h1>
            <form className='formInput mt-0 l:mt-11 scale-90 md:scale-100 min-w-[90%] flex flex-col items-center l:items-baseline l:flex-row gap-16'>
                <div name="first-col" className='flex flex-col'>
                    <LabelInput label="SIGN IN WITH ACCOUNT NAME"/>
                    <LabelInput mt="1rem" label="PASSWORD"/>
                    <div className='flex gap-9 mt-9'>
                        <GreenButton weight="800" size="1.125rem" text="SIGN IN" height="5.18rem"></GreenButton>
                        <GrayButton opacity={0.8} px="2rem" text="Help, I can`t log in" flexGrow="1" height="5.18rem"></GrayButton>
                    </div>

                    <div className='w-full mt-4 flex flex-col justify-center text-center'>
                        <label className='opacity-70'>No account?</label>
                        <Link className='opacity-70 underline underline-offset-2' to ="/Registration">Create a new one!</Link>
                    </div>
                </div>
                <div name = "second-col" className='flex order-first l:order-last flex-col w-56 text-center items-center gap-4'>
                    <label className='text-green w-fit'>SIGN IN WITH QRCODE</label>
                    <img alt="qrcode" className='h-56 w-full' src={QrCode}></img>
                    <p className='opacity-70 font-light text-wrap'>Use out app or other means to scan this QRcode and log in into your account</p>
                </div>

            </form>
        </motion.div>

    )
}