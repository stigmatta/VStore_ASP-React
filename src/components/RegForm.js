import LabelInput from './LabelInput';
import GreenButton from './GreenButton';

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
            <h1 className='mx-auto my-0 w-fit text-formTitle font-extrabold
                           l:mx-0'>Create an account</h1>
            <form className='formInput mt-0 l:mt-11 scale-90 md:scale-100 min-w-[90%] flex flex-col items-center l:items-baseline l:flex-row gap-16'>
                <div name="first-col" className='flex flex-col'>
                    <LabelInput width="46.8125rem" label="EMAIL"/>
                    <LabelInput mt="1rem" width="46.8125rem" label="PASSWORD"/>
                    <input className='mt' type={"checkbox"} value={"hello"}/>


                    <div className='mt-9'>
                        <GreenButton weight="800" size="1.125rem" text="SIGN IN" height="5.18rem"></GreenButton>
                    </div>

                </div>

            </form>
        </motion.div>

    )

}
