import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Board extends Component {
  renderSquare(value) {
    return value==0 ? <EmptySquare /> : <Square value={value}/>;
  }

  render() {
    return (
      <div className="App">
        <div className="game-container">
          <div className="grid-container">
              {this.renderSquare(2)}
              {this.renderSquare(2)}
              {this.renderSquare(2)}
              {this.renderSquare(2)}
              {this.renderSquare(0)}
              {this.renderSquare(0)}
              {this.renderSquare(0)}
              {this.renderSquare(0)}
              {this.renderSquare(0)}
              {this.renderSquare(2)}
              {this.renderSquare(2)}
              {this.renderSquare(2)}
              {this.renderSquare(2)}
              {this.renderSquare(2)}
              {this.renderSquare(2)}
              {this.renderSquare(2)}
          </div>
        </div>

      </div>
    );
  }

}

class Square extends Component {
  render() {
    return (
      <div className="square">
        { this.props.value }
      </div>
    );
  }
}

class EmptySquare extends Component {
  render() {
    return (
      <div className="square-empty"> </div>
    );
  }
}

export default Board;
