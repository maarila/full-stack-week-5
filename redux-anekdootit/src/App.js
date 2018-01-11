import React, {Component} from "react";
import actionFor from "./actionCreators";

class App extends Component {
  addLike = (id) => (e) => {
    this.props.store.dispatch(actionFor.addingLike(id));
  };

  getId = () => (100000 * Math.random()).toFixed(0);

  addNote = (e) => {
    e.preventDefault();
    this.props.store.dispatch(actionFor.creatingNote(e.target.anecdote.value));
    e.target.anecdote.value = "";
  };

  render() {
    const anecdotes = this.props.store.getState();
    const byLikes = (anecdote1, anecdote2) =>
      anecdote1.votes > anecdote2.votes ? -1 : 1;
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort(byLikes).map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={this.addLike(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form onSubmit={this.addNote}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

export default App;
