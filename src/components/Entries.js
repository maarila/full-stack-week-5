import React from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";
import PropTypes from "prop-types";

const Entries = ({blogs}) => {
  const blogStyle = {
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1    
  };

  return (
    <div>
      <h2>Entries</h2>
      <Table striped>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.id} style={blogStyle}>
            <td><Link to={`blogs/${blog.id}`}>{blog.title}</Link></td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

Entries.propTypes = {
  blogs: PropTypes.array.isRequired
};

export default Entries;
