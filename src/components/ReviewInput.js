import ProfileImg from '../images/user-profile.jpg';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export default function ReviewInput({ item }) {
  return (
    <form
      className="mt-6 mb-3 flex flex-col bg-gray-light rounded-xl shadow-xl p-5"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <span className="text-highlightedText font-semibold">Write a review for {item.title}</span>
      <div className="opacity-70 text-normal mt-2">Please describe what you liked or disliked about this game
        and whether you recommend it to others.
        <br />
        Please remember to be polite and follow the Rules and Guidelines
      </div>

      <div className="flex gap-3 mt-5">
        <img className="border border-solid border-green h-[100px] w-[100px]" src={ProfileImg} alt="Profile" />
        <div className="flex flex-col w-4/5 ">
          <textarea className="w-full h-[200px] bg-gray rounded-md border border-solid p-3" />
          <div className="flex justify-between items-end mt-8">
            <div className="flex flex-col gap-2">
              <span className="text-text">Do you recommend this game?</span>
              <div className="flex gap-3">
                <button type={'button'}
                        className="px-4 text-highlightedText py-2 bg-gray-lighter w-fit flex gap-2 items-center rounded-md">
                  <div className="hoverSvg"><ThumbsUp size={24} /></div>
                  Yes
                </button>

                <button type={'button'}
                        className="px-4 py-2 text-highlightedText bg-gray-lighter w-fit flex gap-2 items-center rounded-md">
                  <div className="red-hover"><ThumbsDown size={24} /></div>
                  No
                </button>
              </div>
            </div>
            <button type={'submit'}
                    className="px-4 py-2 text-highlightedText bg-gray-lighter w-fit flex gap-2 items-center rounded-md">Post
            </button>

          </div>
        </div>
      </div>


    </form>
  );
}