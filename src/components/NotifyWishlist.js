import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Toggle from './Toggle';
import Select from './Select'

const NotificationToggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex h-[4.5rem] mb-5 items-center bg-gray-light text-white rounded-xl font-medium ">
        <div className="flex flex-col justify-center items-center text-[22px] bg-green h-full lg:w-[1.5rem] sm:w-[3rem] rounded-l-xl">!</div>

      <div className="flex items-center space-x-3">
          <div className="ml-5 w-fit">
            <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3.5C1 2.96957 1.21071 2.46086 1.58579 2.08579C1.96086 1.71071 2.46957 1.5 3 1.5H17C17.5304 1.5 18.0391 1.71071 18.4142 2.08579C18.7893 2.46086 19 2.96957 19 3.5M1 3.5V13.5C1 14.0304 1.21071 14.5391 1.58579 14.9142C1.96086 15.2893 2.46957 15.5 3 15.5H17C17.5304 15.5 18.0391 15.2893 18.4142 14.9142C18.7893 14.5391 19 14.0304 19 13.5V3.5M1 3.5L10 9.5L19 3.5" stroke="#7BC74D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>


        <p className="text-md">
          Get notified when your wishlisted games go on sale, or are available for purchase or pre-purchase.
        </p>
      </div>
      <div className="ml-auto">
      <Toggle isChecked={isChecked} onToggle={handleCheckboxChange}/>
    </div>

    </div>

  );
};

export default NotificationToggle;