import React, {Component} from "react";
import actionFor from "./actionCreators";

class App extends Component {
  addLike = (id) => (e) => {
    this.props.store.dispatch(actionFor.addingLike(id));
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
        <form>
          <div>
            <input />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

export default App;
