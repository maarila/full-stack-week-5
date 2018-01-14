import React from "react";
import Blog from "./Blog";

const Entries = ({blogs, user, addLike, deleteBlog}) => {
  const byId = (blog1, blog2) => (blog1.likes < blog2.likes ? 1 : -1);
  return (
    <div>
      <h2>entries</h2>
      {blogs
        .sort(byId)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleClick={addLike}
            handleDelete={deleteBlog}
            className="blog"
          />
        ))}
    </div>
  );
};

export default Entries;
