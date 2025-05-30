import { ThumbsDown, ThumbsUp } from "lucide-react";
import ProfilePicture from "./ProfilePicture";
import Image from "../images/user-profile.jpg";
import { useState } from "react";

export default function ReviewInput({ item, user, onSubmit }) {
  const [text, setText] = useState("");
  const [recommends, setRecommends] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Please write your review");
      return;
    }

    if (recommends === null) {
      alert("Please select if you recommend this game");
      return;
    }

    setIsSubmitting(true);

    const newReview = {
      gameId: item.id,
      userId: user.id,
      text: text,
      isLiked: recommends,
      createdAt: new Date().toISOString(),
    };
    onSubmit(newReview).finally(() => {
      setIsSubmitting(false);
      setText("");
    });
  };

  return (
    <form
      className="mt-6 mb-3 flex flex-col bg-gray-light rounded-xl shadow-xl p-5"
      onSubmit={handleSubmit}
    >
      <span className="text-highlightedText font-semibold">
        Write a review for {item.title}
      </span>
      <div className="opacity-70 text-normal mt-2">
        Please describe what you liked or disliked about this game and whether
        you recommend it to others.
        <br />
        Please remember to be polite and follow the Rules and Guidelines
      </div>

      <div className="flex gap-3 mt-5">
        <div className="flex flex-col w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[200px] bg-gray rounded-md border border-solid p-3"
            placeholder="Write your review here..."
          />

          <div className="flex justify-between items-end mt-8">
            <div className="flex flex-col gap-2">
              <span className="text-text">Do you like this game?</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  className={`px-4 py-2 w-fit flex gap-2 items-center rounded-md transition-colors ${
                    recommends === true
                      ? "bg-green text-white"
                      : "bg-gray-lighter text-highlightedText hover:bg-gray-300"
                  }`}
                  onClick={() => setRecommends(true)}
                >
                  <div className={recommends === true ? "text-white" : ""}>
                    <ThumbsUp size={24} />
                  </div>
                  Yes
                </button>

                <button
                  type="button"
                  className={`px-4 py-2 w-fit flex gap-2 items-center rounded-md transition-colors ${
                    recommends === false
                      ? "bg-red-500 text-white"
                      : "bg-gray-lighter text-highlightedText hover:bg-gray-300"
                  }`}
                  onClick={() => setRecommends(false)}
                >
                  <div className={recommends === false ? "text-white" : ""}>
                    <ThumbsDown size={24} />
                  </div>
                  No
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 w-fit flex gap-2 items-center rounded-md transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-lighter hover:bg-gray-300"
              }`}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
