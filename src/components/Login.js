import React from "react";

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

export default Login;
