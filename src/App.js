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
    switch(event.key) {
      case 'ArrowUp':
        this.moveUp();
        break;
      case 'ArrowDown':
        this.moveDown();
        break;
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
    }
  }

  moveLeft() {
    const squares = this.state.squares.slice();
    for (let i = 0; i <= 15; i++) {
      let index = i;
      if (squares[index] !== 0) {
        const leftMostIndex = 4 * Math.floor(index / 4);
        while (index - 1 >= leftMostIndex) {
          if (squares[index - 1] === 0) {
            // left is empty, move left
            squares[index - 1] = squares[index];
            squares[index] = 0;
            index--;
          }
          else if (squares[index - 1] === squares[index]) {
            // left has same number, merge, stop moving
            squares[index - 1] = squares[index - 1] + squares[index];
            squares[index] = 0;
            break;
          }
          else {
            // left has different number, stop moving
            break;
          }
        }
      }
    }
    this.setState({squares});
    this.addNewNumber();
  }

  moveRight() {
    const squares = this.state.squares.slice();
    for (let i= 15; i>= 0; i--) {
      let index = i;
      if (squares[index] !== 0) {
        const rightMostIndex = 3 + 4 * Math.floor(index / 4);
        while (index + 1 <= rightMostIndex) {
          if (squares[index + 1] === 0) {
            // right is empty, move right
            squares[index + 1] = squares[index];
            squares[index] = 0;
            index++;
          }
          else if (squares[index + 1] === squares[index]) {
            // right has same number, merge, stop moving
            squares[index + 1] = squares[index + 1] + squares[index];
            squares[index] = 0;
            break;
          }
          else {
            // right has different number, stop moving
            break;
          }
        }
      }
    }
    this.setState({squares});
    this.addNewNumber();
  }

  moveUp() {
    const squares = this.state.squares.slice();
    for (let i= 0; i<= 15; i++) {
      let index = i;
      if (squares[index] !== 0) {
        const topMostIndex = index % 4;
        while (index - 4 >= topMostIndex) {
          if (squares[index - 4] === 0) {
            // up is empty, move up
            squares[index - 4] = squares[index];
            squares[index] = 0;
            index -= 4;
          }
          else if (squares[index - 4] === squares[index]) {
            // up has same number, merge, stop moving
            squares[index - 4] = squares[index - 4] + squares[index];
            squares[index] = 0;
            break;
          }
          else {
            // up has different number, stop moving
            break;
          }
        }
      }
    }
    this.setState({squares});
    this.addNewNumber();
  }

  moveDown() {
    const squares = this.state.squares.slice();
    for (let i= 15; i >= 0; i--) {
      let index = i;
      if (squares[index] !== 0) {
        const bottomMostIndex = 3 * 4 +index % 4;
        while (index + 4 <= bottomMostIndex) {
          if (squares[index + 4] === 0) {
            // down is empty, move down
            squares[index + 4] = squares[index];
            squares[index] = 0;
            index += 4;
          }
          else if (squares[index + 4] === squares[index]) {
            // down has same number, merge, stop moving
            squares[index + 4] = squares[index + 4] + squares[index];
            squares[index] = 0;
            break;
          }
          else {
            // down has different number, stop moving
            break;
          }
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
    const newValue = Math.random() < 0.3 ? 4 : 2;
    const squares = this.state.squares.slice();
    squares[randomEmptySquareIndex] = newValue;
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
      <div className={"square square-"+this.props.value}>
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
