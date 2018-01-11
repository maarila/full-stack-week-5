const actionFor = {
  creatingNote(content) {
    return {
      type: "NEW_ANECDOTE",
      data: {
        content: content
      }
    };
  },
  addingLike(id) {
    return {
      type: "LIKE",
      data: {id}
    };
  }
};

export default actionFor;
