import React from "react";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import BlogForm from "./components/BlogForm";
import PlainBlog from "./components/PlainBlog";
import Entries from "./components/Entries";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: null,
      error: null,
      success: null,
      blogs: [],
      users: [],
      blogComments: [],
      title: "",
      author: "",
      url: "",
      newComment: ""
    };
  }

  componentWillMount() {
    blogService.getAll().then((blogs) => this.setState({blogs}));
    blogService.getComments().then((blogComments) => {
      this.setState({blogComments});
    });
    userService.getAll().then((users) => this.setState({users}));

    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({user});
      blogService.setToken(user.token);
    }
  }

  login = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      this.setState({
        username: "",
        password: "",
        user,
        success: `User ${user.name} successfully logged in`
      });

      setTimeout(() => {
        this.setState({success: null});
      }, 4000);
    } catch (exception) {
      console.log(exception);
      this.setState({
        username: "",
        password: "",
        error: "Wrong username or password."
      });
      setTimeout(() => {
        this.setState({error: null});
      }, 4000);
    }
  };

  addBlog = (e) => {
    e.preventDefault();
    this.blogForm.toggleVisibility();
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      user: this.state.user
    };

    blogService.create(blogObject).then((newBlog) => {
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: "",
        author: "",
        url: "",
        success: `"${newBlog.title}" by ${
          newBlog.author
        } successfully added to database.`
      });
      setTimeout(() => {
        this.setState({success: null});
      }, 4000);
    });
  };

  addLike = (blog) => {
    return () => {
      const blogObject = {
        user: blog.user._id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      };

      blogService.update(blog.id, blogObject).then((updatedBlog) => {
        let currentBlogs = this.state.blogs.filter(
          (currentBlog) => currentBlog.id !== blog.id
        );
        currentBlogs = currentBlogs.concat(updatedBlog);
        this.setState({
          blogs: currentBlogs
        });
      });
    };
  };

  addBlogComment = (id, e) => {
    e.preventDefault();

    const commentedBlog = this.state.blogs.find((blog) => blog.id === id);

    const blogComment = {
      blogId: id,
      comment: this.state.newComment
    };

    blogService.createComment(blogComment).then((createdComment) => {
      this.setState({
        blogComments: this.state.blogComments.concat(createdComment),
        newComment: "",
        success: `comment "${createdComment.comment}" added to blog "${
          commentedBlog.title
        }"`
      });
      setTimeout(() => {
        this.setState({success: null});
      }, 4000);
    });
  };

  deleteBlog = (id) => {
    return () => {
      const blogToDelete = this.state.blogs.filter((blog) => blog.id === id);
      if (
        window.confirm(
          `Delete "${blogToDelete[0].title}" by ${blogToDelete[0].author}?`
        )
      ) {
        blogService.remove(id).then((response) => {
          const updatedBlogs = this.state.blogs.filter(
            (blog) => blog.id !== id
          );
          this.setState({
            blogs: updatedBlogs,
            success: `"${blogToDelete[0].title}" by ${
              blogToDelete[0].author
            } deleted`
          });
          setTimeout(() => {
            this.setState({success: null});
          }, 4000);
        });
      }
    };
  };

  handleBlogCreation = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleBlogCommentCreation = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  logout = (e) => {
    window.localStorage.removeItem("loggedUser");
    this.setState({user: null});
  };

  handleLoginField = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    const userById = (id) => this.state.users.find((user) => user.id === id);
    const blogById = (id) => this.state.blogs.find((blog) => blog.id === id);
    const commentsById = (id) =>
      this.state.blogComments.filter(
        (blogComment) => blogComment.blogId === id
      );

    if (this.state.user === null) {
      return (
        <div className="loginFields">
          <Notification error={this.state.error} success={this.state.success} />
          <Login
            handleLogin={this.login}
            handleLoginField={this.handleLoginField}
            username={this.state.username}
            password={this.state.password}
            className="login"
          />
        </div>
      );
    }
    return (
      <div>
        <Notification error={this.state.error} success={this.state.success} />
        <h2>blogs</h2>
        <Router>
          <div>
            <p>
              <Link to="/">blogs</Link> &nbsp;
              <Link to="/users">users</Link> &nbsp;
              <em>{this.state.user.name} is logged in </em>
              <button onClick={this.logout}>logout</button>
            </p>
            <Togglable
              buttonLabel="create new entry"
              ref={(component) => (this.blogForm = component)}>
              <BlogForm
                handleBlogCreation={this.handleBlogCreation}
                addBlog={this.addBlog}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
              />
            </Togglable>
            <Route
              exact
              path="/"
              render={() => <Entries blogs={this.state.blogs} />}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({match}) => (
                <PlainBlog
                  blog={blogById(match.params.id)}
                  comments={commentsById(match.params.id)}
                  username={this.state.user.username}
                  handleLike={this.addLike}
                  handleDelete={this.deleteBlog}
                  handleBlogCommentCreation={this.handleBlogCommentCreation}
                  addBlogComment={this.addBlogComment}
                  newComment={this.state.newComment}
                />
              )}
            />
            <Route
              exact
              path="/users/:id"
              render={({match}) => <User user={userById(match.params.id)} />}
            />
            <Route
              path="/users"
              render={() => <Users users={this.state.users} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
