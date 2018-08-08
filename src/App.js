import React, { Component } from 'react';
import './App.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(15).fill(0)
    };
  }

  renderSquare(index) {
    const value = this.state.squares[0];
    return value==0 ? <EmptySquare /> : <Square value={value}/>;
  }

  render() {
    return (
      <div className="App">
        <div className="game-container">
          <div className="grid-container">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
              {this.renderSquare(9)}
              {this.renderSquare(10)}
              {this.renderSquare(11)}
              {this.renderSquare(12)}
              {this.renderSquare(13)}
              {this.renderSquare(14)}
              {this.renderSquare(15)}
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
