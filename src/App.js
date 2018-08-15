import React, { Component } from 'react';
import './App.css';
import * as _ from 'lodash';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = this.getNewGameState();
    this.state = this.addNewNumber(this.state);
    this.state = this.addNewNumber(this.state);
  }

  restartGame() {
    this.setState(this.getNewGameState());
  }

  getNewGameState() {
    return {
      gameOver: false,
      squares: Array(16).fill(0).map(a => {
        return {
          value: 0,
          isNew: false,
          justMerged: false
        }
      })
    }
  }


  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  _handleKeyDown(event) {
    let newState = _.cloneDeep(this.state);
    newState.squares = this.clearOneStepStates(newState.squares);
    switch(event.key) {
      case 'ArrowUp':
        newState.squares = this.moveUp(newState.squares);
        break;
      case 'ArrowDown':
        newState.squares = this.moveDown(newState.squares);
        break;
      case 'ArrowLeft':
        newState.squares = this.moveLeft(newState.squares);
        break;
      case 'ArrowRight':
        newState.squares = this.moveRight(newState.squares);
        break;
    }
    newState = this.addNewNumber(newState);
    this.setState(newState);
  }

  clearOneStepStates(squares) {
    return squares.map(s => {
      const newSquare = Object.assign({}, s);
      newSquare.justMerged = false;
      newSquare.isNew = false;
      return newSquare;
    })
  }

  moveLeft(oldSquares) {
    const squares = oldSquares.slice();
    for (let i = 0; i <= 15; i++) {
      let index = i;
      if (squares[index].value !== 0) {
        const leftMostIndex = 4 * Math.floor(index / 4);
        while (index - 1 >= leftMostIndex) {
          if (squares[index - 1].value === 0) {
            // left is empty, move left
            squares[index - 1].value = squares[index].value;
            squares[index].value = 0;
            index--;
          }
          else if (squares[index - 1].value === squares[index].value) {
            // left has same number, merge, stop moving
            squares[index - 1].value = squares[index - 1].value + squares[index].value;
            squares[index - 1].justMerged = true;
            squares[index].value = 0;
            break;
          }
          else {
            // left has different number, stop moving
            break;
          }
        }
      }
    }
    return squares;
  }

  moveRight(oldSquares) {
    const squares = oldSquares.slice();
    for (let i= 15; i>= 0; i--) {
      let index = i;
      if (squares[index].value !== 0) {
        const rightMostIndex = 3 + 4 * Math.floor(index / 4);
        while (index + 1 <= rightMostIndex) {
          if (squares[index + 1].value === 0) {
            // right is empty, move right
            squares[index + 1].value = squares[index].value;
            squares[index].value = 0;
            index++;
          }
          else if (squares[index + 1].value === squares[index].value) {
            // right has same number, merge, stop moving
            squares[index + 1].value = squares[index + 1].value + squares[index].value;
            squares[index + 1].justMerged = true;
            squares[index].value = 0;
            break;
          }
          else {
            // right has different number, stop moving
            break;
          }
        }
      }
    }
    return oldSquares;
  }

  moveUp(oldSquares) {
    const squares = oldSquares.slice();
    for (let i= 0; i<= 15; i++) {
      let index = i;
      if (squares[index].value !== 0) {
        const topMostIndex = index % 4;
        while (index - 4 >= topMostIndex) {
          if (squares[index - 4].value === 0) {
            // up is empty, move up
            squares[index - 4].value = squares[index].value;
            squares[index].value = 0;
            index -= 4;
          }
          else if (squares[index - 4].value === squares[index].value) {
            // up has same number, merge, stop moving
            squares[index - 4].value = squares[index - 4].value + squares[index].value;
            squares[index - 4].justMerged = true;
            squares[index].value = 0;
            break;
          }
          else {
            // up has different number, stop moving
            break;
          }
        }
      }
    }
    return oldSquares;
  }

  moveDown(oldSquares) {
    const squares = oldSquares.slice();
    for (let i= 15; i >= 0; i--) {
      let index = i;
      if (squares[index].value !== 0) {
        const bottomMostIndex = 3 * 4 +index % 4;
        while (index + 4 <= bottomMostIndex) {
          if (squares[index + 4].value === 0) {
            // down is empty, move down
            squares[index + 4].value = squares[index].value;
            squares[index].value = 0;
            index += 4;
          }
          else if (squares[index + 4].value === squares[index].value) {
            // down has same number, merge, stop moving
            squares[index + 4].value = squares[index + 4].value + squares[index].value;
            squares[index + 4].justMerged = true;
            squares[index].value = 0;
            break;
          }
          else {
            // down has different number, stop moving
            break;
          }
        }
      }
    }
    return oldSquares;
  }


  addNewNumber(state) {
    const newState = _.cloneDeep(state);
    const emptySquareIndices = newState.squares.map((square, index) => square.value === 0 ? index : null).filter(x => x !== null);
    if (emptySquareIndices.length === 0) {
      newState.gameOver = true;
      return newState;
    }
    const randomEmptySquareIndex = emptySquareIndices[Math.floor(Math.random() * emptySquareIndices.length)]
    const newValue = Math.random() < 0.3 ? 4 : 2;
    newState.squares = newState.squares.map((square,index) => {
      const newSquare = Object.assign(square, {});
      if (index === randomEmptySquareIndex) {
        newSquare.value = newValue;
        newSquare.isNew = true;
      }
      return newSquare;
    });
    return newState;
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
              <GameOver visible={this.state.gameOver} onClick={this.restartGame.bind(this)} />
          </div>
        </div>

      </div>
    );
  }

  renderSquare(index) {
    const square = this.state.squares[index];
    return square.value===0 ? <EmptySquare /> : <Square value={square.value} isNew={square.isNew} justMerged={square.justMerged} />;
  }


}

class Square extends Component {
  render() {
    return (
      <div className={"square square-"+this.props.value + (this.props.isNew ? " square-new" : "") + (this.props.justMerged ? " square-merged" : "")} >
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

class GameOver extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className={"info" + (!this.props.visible ? " hidden" : "")}>
      Game over, try again
      </div>
    )
  }
}

export default Board;
