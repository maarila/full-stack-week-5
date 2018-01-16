import React from "react";
import PropTypes from "prop-types";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

const BlogForm = ({handleBlogCreation, addBlog, title, author, url}) => {
  return (
    <div>
      <h2>Create a new blog entry</h2>
      <form onSubmit={addBlog}>
        <FormGroup>
          <ControlLabel>title:</ControlLabel>
          <FormControl
            type="text"
            name="title"
            value={title}
            onChange={handleBlogCreation}
          />
          <ControlLabel>author:</ControlLabel>
          <FormControl
            type="text"
            name="author"
            value={author}
            onChange={handleBlogCreation}
          />
          <ControlLabel>url:</ControlLabel>
          <FormControl
            type="text"
            name="url"
            value={url}
            onChange={handleBlogCreation}
          />
          <Button bsStyle="primary" type="submit">
            create
          </Button>
        </FormGroup>
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
