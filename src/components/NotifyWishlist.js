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
          <div className="ml-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#7BC74D"  className="size-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg></div>


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