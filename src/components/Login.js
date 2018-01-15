import React from "react";
import PropTypes from "prop-types";

const Login = ({handleLogin, handleLoginField, username, password}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleLoginField}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleLoginField}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLoginField: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default Login;
