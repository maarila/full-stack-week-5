import React from "react";

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
            <User key={user.id} name={user.name} blogs={user.blogs.length} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const User = ({name, blogs}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{blogs}</td>
    </tr>
  );
};

export default Users;
