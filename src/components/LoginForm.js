import GrayButton from './GrayButton';
import QrCode from '../images/qr_code.png'
import { Link } from 'react-router-dom';
import LabelInput from './LabelInput';
import GreenButton from './GreenButton';

export default function LoginForm(){
    return(
        <div>
            <h1 className='w-fit text-formTitle font-extrabold'>Log in</h1>
            <form className='formInput flex flex-row gap-16'>
                <div name="first-col" className='flex flex-col'>
                    <LabelInput label="SIGN IN WITH ACCOUNT NAME"/>
                    <LabelInput label="PASSWORD"/>
                    <div className='flex gap-9 mt-9'>
                        <GreenButton weight="800" size="1.125rem" text="SIGN IN" px="13rem" height="5.18rem"></GreenButton>
                        <GrayButton opacity={0.8} text="Help, I can`t log in" flexGrow="1" height="5.18rem"></GrayButton>
                    </div>

                    <div className='w-full mt-4 flex flex-col justify-center text-center'>
                        <label className='opacity-70'>No account?</label>
                        <Link className='opacity-70 underline underline-offset-2' to ="/Registration">Create a new one!</Link>
                    </div>
                </div>
                <div name = "second-col" className='flex flex-col w-56 text-center items-center gap-4'>
                    <label className='text-green w-fit'>SIGN IN WITH QRCODE</label>
                    <img className='h-56 w-full' src={QrCode}></img>
                    <p className='opacity-70 font-light text-wrap'>Use out app or other means to scan this QRcode and log in into your account</p>
                </div>

            </form>
        </div>

    )
}