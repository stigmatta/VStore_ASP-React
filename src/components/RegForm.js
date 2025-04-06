import LabelInput from './LabelInput';
import FormGreenButton from './FormGreenButton';
import Checkbox from "./Checkbox";
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';

export default function RegForm({ initial = 1, final = 1, setModalVisible, setFormVisible }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormVisible(false);
    setModalVisible(true);
  };

  return (
    <motion.div
      initial={{ scale: initial }}
      whileHover={{ scale: final }}
      transition={{ type: 'spring', duration: 0.25, stiffness: 100 }}
    >
      <h1 className='l:ml-11 mx-auto my-0 w-fit text-formTitle font-extrabold l:mx-0'>
        Create an account
      </h1>

      <form
        onSubmit={handleSubmit}
        className='formInput p-11 mt-0 l:scale-90 md:scale-100 min-w-[90%] w-full max-w-[830px] flex flex-col items-center l:items-baseline l:flex-row gap-16'
      >
        <div name="first-col" className='flex flex-col'>
          <LabelInput label="EMAIL" />
          <LabelInput mt="1rem" label="PASSWORD" />
          <Checkbox />
          <div className='mt-6'>
            <ReCAPTCHA sitekey="6LdSNQsrAAAAAPxct6mgv8rSnBE8rC9UpMivQA5R" />
          </div>

          <div className='mt-7 w-full'>
            <FormGreenButton
              weight="800"
              size="1.125rem"
              text="SIGN IN"
              height="5.18rem"
              className="w-full"
              type="submit"
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
}
