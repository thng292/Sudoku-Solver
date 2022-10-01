import './App.css'
import React, { useState } from 'react'
import Board from './SudokuBoard/Board'
import BoardStatus from './SudokuBoard/BoardStatus'
import checkBoard from './SudokuLogic/Game'
import GameSolver from './SudokuLogic/Solver'

const solver = GameSolver
// const initBoard = [
// [0, 6, 7, 0, 4, 2, 9, 0, 0],
// [4, 0, 0, 0, 8, 6, 0, 0, 7],
// [0, 0, 0, 7, 0, 0, 0, 0, 0],
// [0, 4, 1, 0, 0, 7, 0, 5, 8],
// [0, 0, 2, 3, 6, 8, 4, 0, 0],
// [7, 8, 0, 4, 0, 0, 3, 9, 0],
// [0, 0, 0, 0, 0, 3, 0, 0, 0],
// [5, 0, 0, 8, 9, 0, 0, 0, 6],
// [0, 0, 3, 2, 5, 0, 1, 8, 0]]

// const initBoard = [
//   [5, 0, 0, 0, 8, 3, 2, 0, 0],
//   [0, 4, 7, 0, 0, 5, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 9, 4],
//   [0, 0, 0, 6, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 9, 7, 4, 6, 0],
//   [0, 0, 8, 2, 3, 0, 0, 0, 5],
//   [8, 0, 5, 7, 0, 6, 3, 0, 0],
//   [4, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 3, 0, 5, 9, 0, 0, 0]
// ]

const initBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function App() {
  let [gameBoard, setGameBoard] = useState({
    squares: initBoard.map((x)=>x.filter(()=>true)),
    status: BoardStatus.Normal,
  })
  
  return <div className='flex-center'>
    
      <p>Sudoku Solver</p>
      <p></p>
      <Board
        squares={gameBoard.squares}
        status={gameBoard.status}
        onValueChange={(i: number, j: number, inp: string) => {
          let inpnum = (Number(inp)>0 && Number(inp)<10) ? Number(inp) : 0
          let newBoard = gameBoard.squares.map((x)=>x.filter(()=>true))
          newBoard[i][j] = inpnum
          let newStatus = checkBoard(newBoard)
          setGameBoard({squares: newBoard, status:newStatus })
        } }
      />

      <div className='flex-evenly'>
      <button onClick={() => {
        let tmp = new Promise((res: (newBoard: number[][])=>void) => {
          res(solver(gameBoard.squares.map((x)=>x.filter(()=>true))))
        })
        tmp.then((newBoard: number[][]) => {
          setGameBoard({
            squares: newBoard,
            status: BoardStatus.Solved
          })
        })
      }}>Solve</button>

        {/* <button onClick={() => {
          setGameBoard({
            squares: gameBoard.squares,
            status: checkBoard(gameBoard.squares)
          })
        }}>Manual Check</button> */}

      <button onClick={() => {
        //console.log(initBoard)
          setGameBoard({
            squares: initBoard.map((x)=>x.filter(()=>true)),
            status: BoardStatus.Normal
          })
        }}>
          Clear
        </button>
      </div>
    
  </div>
}

export default App
