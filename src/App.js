import React, { Component } from 'react';
import './App.css';
import * as _ from 'lodash';

const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';

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
    if ( this.state.gameOver ) { return ; }
    let direction;
    switch(event.key) {
      case 'ArrowUp':
        direction = UP;
        break;
      case 'ArrowDown':
        direction = DOWN;
        break;
      case 'ArrowLeft':
        direction = LEFT;
        break;
      case 'ArrowRight':
        direction = RIGHT;
        break;
      default: return;
    }
    let newState = _.cloneDeep(this.state);
    newState.squares = this.clearOneStepStates(newState.squares);
    newState.squares = this.move(newState.squares, direction);
    newState = this.addNewNumber(newState);
    this.setState(newState);
  }

/**
 * Flags indicating if a square was just merged or was just added are used for CSS animations and should only last one game loop.
 * This function flips them to negative and is called once each round, just before moving squares
 * @param {*} squares
 * @returns
 * @memberof Board
 */
clearOneStepStates(squares) {
    return squares.map(s => {
      const newSquare = Object.assign({}, s);
      newSquare.justMerged = false;
      newSquare.isNew = false;
      return newSquare;
    })
  }

/**
 * Add a new number on a random empty square. If there is no more empty squares, game over
 *
 * @param {*} state
 * @returns
 */
addNewNumber(_state) {
    const state = _.cloneDeep(_state);
    const emptySquareIndices = state.squares.map((square, index) => square.value === 0 ? index : null).filter(x => x !== null);
    if (emptySquareIndices.length === 0) {
      state.gameOver = true;
      return state;
    }
    const randomEmptySquareIndex = emptySquareIndices[Math.floor(Math.random() * emptySquareIndices.length)]
    const newValue = Math.random() < 0.3 ? 4 : 2;
    state.squares[randomEmptySquareIndex].value = newValue;
    state.squares[randomEmptySquareIndex].isNew = true;
    return state;
  }

/**
 * Move squares in the desired direction
 *
 * @param {*} _squares
 * @param {*} direction
 * @returns
 * @memberof Board
 */
move(_squares, direction) {
    const squares = _squares.slice();
    const {startIndex, shouldContinue, moveIndex} = this.getIterationObject(direction);
    for (let i = startIndex; shouldContinue(i); i = moveIndex(i)) {
      let index = i;
      let nextIndex = this.getNextIndex(index, direction);
      if (squares[index].value !== 0) {
        while (!this.isNextIndexOverEdge(index, direction)) {
          const currentSquareValue = squares[index].value;
          const nextSquareValue = squares[nextIndex].value;
          if (nextSquareValue === 0) {
            // left is empty, move left
            this.swapSquares(squares, index, nextIndex);
            index = nextIndex;
            nextIndex = this.getNextIndex(index, direction);
          }
          else if ( nextSquareValue === currentSquareValue ) {
            // left has same number, merge, stop moving
            this.mergeSquares(squares, index, nextIndex);
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


/**
 * @param {String} direction
 * @returns object with keys startIndex (Number), shouldContinue (function), moveIndex(function) to be used in a for loop
 */
getIterationObject(direction) {
  switch(direction) {
    case LEFT:
    case UP:
     return {
      startIndex: 0,
      shouldContinue: i => i <= 15,
      moveIndex: i => i+1
    }
    case RIGHT:
    case DOWN: return {
      startIndex: 15,
      shouldContinue: i => i >= 0,
      moveIndex: i => i-1
    }
    default: throw new Error('Unexpected direction');
  }

}

/**
 * given an index and direction, return a boolean indicating if the next index is "over the edge", meaning outside of the column / row in which you are moving
 *
 * @param {*} index
 * @param {*} direction
 * @returns {Bool}
 */
isNextIndexOverEdge(index, direction) {
  const nextIndex = this.getNextIndex(index, direction);
  switch(direction) {
    case LEFT: return nextIndex < (4 * Math.floor(index / 4));
    case RIGHT: return nextIndex > (3 + 4 * Math.floor(index / 4));
    case UP: return nextIndex < (index % 4);
    case DOWN: return nextIndex > (3 * 4 +index % 4);
    default: throw new Error('Unexpected direction');
  }

}

/**
 * given an index and direction, get the next index in that direction. (e.g. moving left you go from 4 -> 3 -> 2 -> 1), moving down you go from (3-7-11-15)
 *
 * @param {Number} index
 * @param {*} direction
 * @returns {Number}
 */
getNextIndex(index, direction) {
  switch(direction) {
    case LEFT: return index - 1;
    case RIGHT: return index + 1;
    case UP: return index - 4;
    case DOWN: return index + 4;
    default: throw new Error('Unexpected direction');
  }
}
/**
 * Given an array of squares, switch values from fromIndex and toIndex
 *
 * @param {Array} squares, gets mutated
 * @param {*} fromSquareIndex
 * @param {*} toSquareIndex
 * @memberof Board
 */
swapSquares(squares, fromIndex, toIndex) {
    const temp = squares[fromIndex];
    squares[fromIndex] = squares[toIndex];
    squares[toIndex] = temp;
  }

/**
 * Given an array of squares, merge values from fromIndex and toIndex
 *
 * @param {Array} squares, gets mutated
 * @param {*} fromSquareIndex
 * @param {*} toSquareIndex
 * @memberof Board
 */
  mergeSquares(squares, fromIndex, toIndex) {
    // left has same number, merge, stop moving
    squares[toIndex].value = squares[toIndex].value + squares[fromIndex].value;
    squares[toIndex].justMerged = true;
    squares[fromIndex].value = 0;
  }



  render() {
    return (
      <div className="App">
        <div className="game-container">
          <div className="grid-container">
            {[...Array(16).keys()].map(i => this.renderSquare(i))}
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
      <div className="square-empty"></div>
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
