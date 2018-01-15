import React from "react";
import PropTypes from "prop-types";

class PlainBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  render() {
    if (this.props.blog === undefined) {
      return null;
    }
    const blogAdder =
      this.props.blog.user === undefined
        ? "anonymous"
        : this.props.blog.user.name;

    const blogsUsername =
      this.props.blog.user === undefined
        ? "anonymous"
        : this.props.blog.user.username;
    const showDelete = {
      display:
        this.props.username === blogsUsername || "anonymous" === blogsUsername
          ? ""
          : "none"
    };
    return (
      <div>
        <h2>
          {this.props.blog.title} by {this.props.blog.author}
        </h2>
        <div>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
        </div>
        <div>
          {this.props.blog.likes} likes{" "}
          <button onClick={this.props.handleLike(this.props.blog)}>like</button>
        </div>
        <div>added by {blogAdder}</div>
        <div style={showDelete}>
          <button onClick={this.props.handleDelete(this.props.blog.id)}>
            delete
          </button>
        </div>
        <h3>comments</h3>
        <ul>
          {this.props.blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form>
          <div>
            <input />
            <button>add comment</button>
          </div>
        </form>
      </div>
    );
  }
}

PlainBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
};

export default PlainBlog;
