import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Entries = ({blogs}) => {
  const blogStyle = {
    width: 400,
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
      <h2>entries</h2>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

Entries.propTypes = {
  blogs: PropTypes.array.isRequired
};

export default Entries;
