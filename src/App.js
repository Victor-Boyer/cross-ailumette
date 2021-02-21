import "./App.css";
import React, { Component } from "react";
const AIlumette = require("./body-game");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      ligne: "1",
      match: "1",
    };
  }

  componentDidMount () {
    
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newLog = (e) => {
    e.preventDefault();
    let logs = this.state.logs;
    const log = {};
    log.body = "Ligne : " + this.state.ligne + " - Matchs : " + this.state.match;
    logs.push(log);
    this.setState({
      logs: logs,
    });
  };

  render() {
    console.log(AIlumette.constructor());
    //const Game = new AIlumette();
    return (
      <section>
        <div className="App">
          <table>
            <thead>
              <tr>
                <th colSpan="2">AI Lumette</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>|</td>
              </tr>
              <tr>
                <td>|</td>
                <td>|</td>
                <td>|</td>
              </tr>
              <tr>
                <td>|</td>
                <td>|</td>
                <td>|</td>
                <td>|</td>
                <td>|</td>
              </tr>
              <tr>
                <td>|</td>
                <td>|</td>
                <td>|</td>
                <td>|</td>
                <td>|</td>
                <td>|</td>
                <td>|</td>
              </tr>
            </tbody>
          </table>
          <div id="container-block">
            <div>
              <label for="ligne">Ligne</label>
              <input
                id="ligne"
                name="ligne"
                onChange={this.onChange}
                type="number"
                min="1"
                max="4"
              />
            </div>
            <div>
              <label for="match">Match</label>
              <input
                id="match"
                name="match"
                onChange={this.onChange}
                type="number"
                min="1"
                max="7"
              />
            </div>
            <div style={{ width: "100%" }}>
              <button onClick={this.newLog} style={{ width: "100px", "marginTop": "20px" }}>
                Valider
              </button>
            </div>
            <div></div>
          </div>
        </div>
        <div id="log-container">
          {this.state.logs.map((log) => (
            <div className="log-box"> <strong>Joueur : </strong> {log.body}</div>
          ))}
        </div>
      </section>
    );
  }
}
