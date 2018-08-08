import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Board extends Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    return (
      <div className="App">
        <div className="game-container">
          <div className="grid-container">
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
              {this.renderSquare()}
          </div>
        </div>

      </div>
    );
  }

}

class Square extends Component {
  constructor() {
    super();
    this.state = {
      empty: false,
      value: 2
    };
  }

  render() {
    return (
      <div className={this.state.empty ? "square-empty" : "square"}>
        { this.state.value }
      </div>
    );
  }
}
export default Board;
