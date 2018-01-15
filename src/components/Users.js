import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Users = ({users}) => {
  return (
    <div>
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>blogs added</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
