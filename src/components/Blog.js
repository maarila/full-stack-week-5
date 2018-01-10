import React from "react";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false
    };
  }

  toggleShowAll = () => {
    this.setState({showAll: !this.state.showAll});
  };

  render() {
    const showTitle = {display: this.state.showAll ? "none" : ""};
    const showFullInfo = {display: this.state.showAll ? "" : "none"};

    const blogStyle = {
      width: 400,
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5
    };

    return (
      <div style={blogStyle}>
        <div style={showTitle}>
          <div onClick={this.toggleShowAll}>{this.props.blog.title}</div>
        </div>
        <div style={showFullInfo}>
          <div onClick={this.toggleShowAll}>{this.props.blog.title}</div>
          <div>{this.props.blog.author}</div>
          <div>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
          </div>
          <div>
            {this.props.blog.likes} likes<button
              onClick={this.props.handleClick(this.props.blog)}>
              like
            </button>
          </div>
          <div>added by {this.props.blog.user.name}</div>
        </div>
      </div>
    );
  }
}

export default Blog;
