import React from "react";
import PropTypes from "prop-types";

const BlogForm = ({handleBlogCreation, addBlog, title, author, url}) => {
  return (
    <div>
      <h2>create new blog entry</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleBlogCreation}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleBlogCreation}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleBlogCreation}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleBlogCreation: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default BlogForm;
