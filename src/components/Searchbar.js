export default function Searchbar() {
  return (
    <div className="relative bg-gray-light rounded-full mt-[2.375rem]
                    lg:w-full lg:max-w-[18.0625rem] lg:mt-0">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input
            className="bg-gray-light rounded-full border-none w-full p-3 ps-9
            placeholder:text-gray-lightest placeholder:opacity-75 placeholder:py-3
            transition-colors duration-300
            focus-visible:outline-none focus-visible:bg-gray-lighterInput"
            placeholder="Search store"
            type="text"
            name="search"
        />
  
    </div>
  );
}


