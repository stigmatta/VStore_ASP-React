
import FormGreenButton from './FormGreenButton';
import { motion } from 'framer-motion';
import {Link} from "react-router-dom";
import GrayButton from "./GrayButton";


export default function CreatedForm({initial = 1 ,final = 1})
{
    return(
        <motion.div
            initial={{scale:initial}}
            whileHover={{ scale:final}}
            transition={{type:'spring',duration:.25,stiffness:100}}
        >
            <form className='formInput p-11 mt-0 md:scale-100 flex flex-col items-center gap-16'>
                <div className='flex flex-col items-center'>
                    <h1 className='mt-5 text-4xl font-extrabold'>Account created!</h1>
                    <h3 className='mt-5 text-lg text-gray-400'>An email has been sent to you.</h3>

                </div>

                <div className='mt-5'>
                    <Link to="/Login">
                        <FormGreenButton weight="800" size="1.125rem" text="LOG IN" height="5.18rem" className="w-full" />
                    </Link>
                </div>
            </form>
        </motion.div>

    )

}
