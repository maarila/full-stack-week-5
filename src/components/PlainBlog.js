import React from "react";

const PlainBlog = ({blog, username, handleLike, handleDelete}) => {
  if (blog === undefined) {
    return null;
  }
  const blogAdder = blog.user === undefined ? "anonymous" : blog.user.name;

  const blogsUsername =
    blog.user === undefined ? "anonymous" : blog.user.username;
  const showDelete = {
    display:
      username === blogsUsername || "anonymous" === blogsUsername ? "" : "none"
  };

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
      <div>added by {blogAdder}</div>
      <div style={showDelete}>
        <button onClick={handleDelete(blog.id)}>delete</button>
      </div>
    </div>
  );
};

export default PlainBlog;
