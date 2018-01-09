import React from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: null,
      blogs: []
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
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      this.setState({username: "", password: "", user});
    } catch (exception) {
      console.log("käyttäjätunnus tai salasana väärin");
    }
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
        <h2>blogs</h2>
        <p>
          <em>{this.state.user.name} is logged in </em>
          <button onClick={this.logout}>logout</button>
        </p>
        {this.state.blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    );
  }
}

export default App;
