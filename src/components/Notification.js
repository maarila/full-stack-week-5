import React from "react";

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

export default Notification;