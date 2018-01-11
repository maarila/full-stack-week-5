const actionFor = {
  addingLike(id) {
    return {
      type: "LIKE",
      data: {id}
    };
  }
};

export default actionFor;
