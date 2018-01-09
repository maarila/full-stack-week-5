import React from "react";
import Blog from "./components/Blog";
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
        success: `"${blogObject.title}" by ${blogObject.author} added to database`
      });
      setTimeout(() => {
        this.setState({success: null});
      }, 4000);
    });
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
    if (this.state.user === null) {
      return (
        <div>
          <Notification error={this.state.error} success={this.state.success} />
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
            <div>
              username:
              <input
                type="text"
                value={this.state.username}
                name="username"
                onChange={this.handleLoginField}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleLoginField}
              />
            </div>
            <button>login</button>
          </form>
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
        <div>
          <h2>create new blog entry</h2>
          <form onSubmit={this.addBlog}>
            <div>
              title:{" "}
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleBlogCreation}
              />
            </div>
            <div>
              author:{" "}
              <input
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleBlogCreation}
              />
            </div>
            <div>
              url:{" "}
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleBlogCreation}
              />
            </div>
            <button>create</button>
          </form>
        </div>
        <h2>entries</h2>
        {this.state.blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    );
  }
}

const Notification = ({error, success}) => {
  if (error === null && success === null) {
    return null;
  }
  return success === null ? (
    <div className="error">{error}</div>
  ) : (
    <div className="success">{success}</div>
  );
};

export default App;
