import React from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
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
      title: "",
      author: "",
      url: ""
    };
  }

  componentWillMount() {
    blogService.getAll().then((blogs) => this.setState({blogs}));

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
        success: `"${blogObject.title}" by ${
          blogObject.author
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

  logout = (e) => {
    window.localStorage.removeItem("loggedUser");
    this.setState({user: null});
  };

  handleLoginField = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    const byId = (blog1, blog2) => (blog1.likes < blog2.likes ? 1 : -1);
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
        <p>
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
        <h2>entries</h2>
        {this.state.blogs
          .sort(byId)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={this.state.user}
              handleClick={this.addLike}
              handleDelete={this.deleteBlog}
              className="blog"
            />
          ))}
      </div>
    );
  }
}

export default App;
