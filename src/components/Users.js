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
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
