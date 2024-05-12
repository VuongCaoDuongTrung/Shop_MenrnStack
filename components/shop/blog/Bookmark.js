import React from "react";
import Bookmarks from "./Bookmarks";

const Bookmark = ({ bookmarks }) => {
  return (
    <div className="bookmark-page">
      <h1>Các bài mà bạn đã đánh dấu:</h1>
      <Bookmarks bookmarks={bookmarks} />
    </div>
  );
};

export default Bookmark;
