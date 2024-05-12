import React from "react";
import Post from "./Post";

const Posts = ({ posts, handleBookmark, handleRemoveBookmark }) => {
  const showPost = posts.map((post) => (
    <Post
      key={post.id}
      post={post}
      handleBookmark={handleBookmark}
      handleRemoveBookmark={handleRemoveBookmark}
    />
  ));

  return <div>{showPost}</div>;
};

export default Posts;
