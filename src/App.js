import React, { Component } from 'react';
import './App.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(15).fill(0).concat([2])
    };
  }

  renderSquare(index) {
    const value = this.state.squares[index];
    return value===0 ? <EmptySquare /> : <Square value={value}/>;
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  _handleKeyDown(event) {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    switch(event.key) {
      case 'ArrowUp':
        this.addNewNumber();
        break;
      case 'ArrowDown':
        this.addNewNumber();
        break;
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.addNewNumber();
        break;
    }
  }

  moveLeft() {
    //first row
    //first  square
    //second  square
    const squares = this.state.squares.slice();
    for (let index of [1, 5, 9, 13]) {
      if (squares[index] !== 0) {
        if (squares[index - 1] === 0) {
          //left is empty, move left
          squares[index - 1] = squares[index];
          squares[index] = 0;
        }
        if (squares[index - 1] === squares[index]) {
          // left has same number, merge
          squares[index - 1] = squares[index - 1] + squares[index];
          squares[index] = 0;
        }
      }

    }
    this.setState({squares});
    this.addNewNumber();
  }

  addNewNumber() {
    const emptySquareIndices = this.state.squares.map((val, index) => val === 0 ? index : null).filter(x => x !== null);
    if (emptySquareIndices.length === 0) {
      console.log('game over');
      return;
    }
    const randomEmptySquareIndex = emptySquareIndices[Math.floor(Math.random() * emptySquareIndices.length)]
    const squares = this.state.squares.slice();
    squares[randomEmptySquareIndex] = 2;
    this.setState({squares});
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
