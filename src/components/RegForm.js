import LabelInput from './LabelInput';
import FormGreenButton from './FormGreenButton';

import { motion } from 'framer-motion';

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
            <form className='formInput p-11 mt-0 l:mt-11 scale-90 md:scale-100 flex flex-col items-center'>
                <div className='flex flex-col'>
                    <LabelInput width="46.8125rem" label="EMAIL"/>
                    <LabelInput mt="1rem" width="46.8125rem" label="PASSWORD"/>

                    <div className='mt-9'>
                        <FormGreenButton weight="800" size="1.125rem" text="SIGN IN" height="5.18rem"></FormGreenButton>
                    </div>
                </div>
            </form>
        </motion.div>

    )

}
