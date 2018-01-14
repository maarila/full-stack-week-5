import React from "react";

const PlainBlog = ({blog, handleLike}) => {
  if (blog === undefined) {
    return null;
  }
  const username = blog.user === undefined ? "anonymous" : blog.user.name;

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike(blog)}>like</button>
      </div>
      added by {username}
    </div>
  );
};

export default PlainBlog;
