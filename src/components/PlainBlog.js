import React from "react";
import PropTypes from "prop-types";
import {Table, Button} from "react-bootstrap";

const PlainBlog = ({
  blog,
  comments,
  username,
  handleLike,
  handleDelete,
  handleBlogCommentCreation,
  addBlogComment,
  newComment
}) => {
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
        {blog.likes} likes{" "}
        <Button bsSize="xsmall" onClick={handleLike(blog)}>
          like
        </Button>
      </div>
      <div>added by {blogAdder}</div>
      <div style={showDelete}>
        <Button
          bsStyle="danger"
          bsSize="xsmall"
          onClick={handleDelete(blog.id)}>
          delete
        </Button>
      </div>
      <h3>comments</h3>
      <Table striped>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <form onSubmit={(e) => addBlogComment(blog.id, e)}>
        <input
          name="newComment"
          value={newComment}
          onChange={handleBlogCommentCreation}
        />
        <Button bsStyle="primary" bsSize="small">add comment</Button>
      </form>
    </div>
  );
};

PlainBlog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
};

export default PlainBlog;
