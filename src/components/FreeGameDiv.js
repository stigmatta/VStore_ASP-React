import CustomSlider from "./CustomSlider";
import TransparentButton from "./TransparentButton";

export default function FreeGameDiv({ games }) {
  return (
    <div className="flex flex-col gap-9 bg-form-gradient ~px-8/11 pt-[23px] pb-[38px] rounded-3xl h-fit  mx-auto w-full imd:mx-0">
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-5">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 11.6667V38.75M20 11.6667C19.2464 8.5613 17.9488 5.90631 16.2765 4.04819C14.6042 2.19006 12.6348 1.21492 10.625 1.24993C9.24366 1.24993 7.9189 1.79867 6.94215 2.77542C5.9654 3.75217 5.41667 5.07693 5.41667 6.45827C5.41667 7.8396 5.9654 9.16436 6.94215 10.1411C7.9189 11.1179 9.24366 11.6666 10.625 11.6666M20 11.6667C20.7536 8.5613 22.0512 5.90631 23.7235 4.04819C25.3958 2.19006 27.3652 1.21492 29.375 1.24993C30.7563 1.24993 32.0811 1.79867 33.0578 2.77542C34.0346 3.75217 34.5833 5.07693 34.5833 6.45827C34.5833 7.8396 34.0346 9.16436 33.0578 10.1411C32.0811 11.1179 30.7563 11.6666 29.375 11.6666M34.5833 20V34.5834C34.5833 35.6884 34.1443 36.7483 33.3629 37.5297C32.5815 38.3111 31.5217 38.75 30.4167 38.75H9.58333C8.47826 38.75 7.41846 38.3111 6.63705 37.5297C5.85565 36.7483 5.41667 35.6884 5.41667 34.5834V20M1.25 13.75C1.25 13.1975 1.46949 12.6676 1.86019 12.2769C2.25089 11.8862 2.7808 11.6667 3.33333 11.6667H36.6667C37.2192 11.6667 37.7491 11.8862 38.1398 12.2769C38.5305 12.6676 38.75 13.1975 38.75 13.75V17.9167C38.75 18.4692 38.5305 18.9991 38.1398 19.3898C37.7491 19.7805 37.2192 20 36.6667 20H3.33333C2.7808 20 2.25089 19.7805 1.86019 19.3898C1.46949 18.9991 1.25 18.4692 1.25 17.9167V13.75Z"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="text-highlightedText font-bold">Free games!</h3>
        </div>

        <TransparentButton title="View more" radius="4px" />
      </div>
      <CustomSlider items={games} componentName="FreeGame" />
    </div>
  );
}
