import React from "react";
import {FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import PropTypes from "prop-types";

const Login = ({handleLogin, handleLoginField, username, password}) => {
  return (
    <div>
      <h2>Blog app login</h2>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <ControlLabel>username:</ControlLabel>
          <FormControl
            type="text"
            value={username}
            name="username"
            onChange={handleLoginField}
          />
        <ControlLabel>
          password:</ControlLabel>
          <FormControl
            type="password"
            value={password}
            name="password"
            onChange={handleLoginField}
          />
        <Button bsStyle="primary" className="btn btn-primary btn-block" type="submit">Login</Button>
        </FormGroup>
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
