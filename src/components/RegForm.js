import LabelInput from './LabelInput';
import GreenButton from './GreenButton';
import Checkbox from "./Checkbox";
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';
import {Link} from "react-router-dom";
import GrayButton from "./GrayButton";


export default function RegForm({initial = 1 ,final = 1})
{
    return(
        <motion.div
            initial={{scale:initial}}
            whileHover={{ scale:final}}
            transition={{type:'spring',duration:.25,stiffness:100}}
        >
           <h1 className='l:ml-10 mx-auto my-0 w-fit text-formTitle font-extrabold
                           l:mx-0'>Create an account</h1>
            <form className='formInput mt-0 l: scale-90 md:scale-90 w-full max-w-[830px] flex flex-col items-center l:items-baseline l:flex-row gap-16'>

                <div name="first-col" className='flex flex-col'>
                    <LabelInput label="EMAIL"/>
                    <LabelInput mt="1rem"  label="PASSWORD"/>
                    <Checkbox/>
                    <div className='mt-6'>
                    <ReCAPTCHA

        sitekey="6LdSNQsrAAAAAPxct6mgv8rSnBE8rC9UpMivQA5R"
      />
                        </div>


                    <div className='mt-7'>
                        <GreenButton weight="800" size="1.125rem" text="SIGN IN" height="5.18rem"></GreenButton>
                    </div>

                </div>

            </form>
        </motion.div>

    )

}
