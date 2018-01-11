import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

class App extends React.Component {
  positiivisia = () => {
    const palautteita =
      store.getState().good + store.getState().ok + store.getState().bad;
    if (palautteita > 0) {
      return store.getState().good / palautteita * 100 + " %";
    }
    return "palautetta ei vielä annettu";
  };

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={(e) => store.dispatch({type: "GOOD"})}>hyvä</button>
        <button onClick={(e) => store.dispatch({type: "OK"})}>neutraali</button>
        <button onClick={(e) => store.dispatch({type: "BAD"})}>huono</button>
        <h2>Statistiikka</h2>
        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{store.getState().good}</td>
            </tr>

            <tr>
              <td>neutraali</td>
              <td>{store.getState().ok}</td>
            </tr>

            <tr>
              <td>huono</td>
              <td>{store.getState().bad}</td>
            </tr>

            <tr>
              <td>hyviä</td>
              <td>{this.positiivisia()}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={(e) => store.dispatch({type: "ZERO"})}>
          nollaa tilasto
        </button>
      </div>
    );
  }
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};
renderApp();
store.subscribe(renderApp);
