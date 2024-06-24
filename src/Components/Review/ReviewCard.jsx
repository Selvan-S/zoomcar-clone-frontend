import React from "react";
import startSvg from "../../assets/star.svg";
import headshortPlaceholder from "../../assets/headshort.jpeg";
function ReviewCard({ review }) {
  // Define the maximum length for the truncated text
  const maxLength = 100;
  // truncation of user comment - 100 characters
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }
  // user reivew starts
  function getStars(count) {
    const start_array = [];
    for (let index = 0; index < count; index++) {
      start_array.push(<img src={startSvg} alt="star" className="w-4 h-4" />);
    }
    return start_array;
  }
  return (
    <div className="max-w-xs w-full max-md:max-w-full max-md:max-h-full">
      <div className="card max-h-full bg-base-100 shadow-xl">
        <div className="flex items-center gap-x-4">
          {/* Display user picture or name first letter or placeholder image */}
          <button className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {review.user?.userAvatarLink ? (
                <img alt="avatar" src={review.user.userAvatarLink} />
              ) : review.user?.name ? (
                <span className="uppercase text-3xl">
                  {review.user.name.substring(0, 1)}
                </span>
              ) : (
                <img alt="avatar" src={headshortPlaceholder} />
              )}
            </div>
          </button>
          <span>{review.user.name}</span>
        </div>
        {/* Display user comment */}
        <div className="card-body">
          <h2 className="card-title">{getStars(review.rating)}</h2>
          <p>{truncateText(review.comment, maxLength)}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
