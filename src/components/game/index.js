import React from 'react'
import "../../App.css"
import Board from "../board";

function calculateWinner(squares) {
     const lines = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6]
     ];
     for (let i = 0; i < lines.length; i++) {
       const [a, b, c] = lines[i];
       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
         return squares[a];
       }
     }
     return null;
   }
function Game() {
     const [state,setState]=React.useState({
          history: [
          {
               squares: Array(25).fill(null),
               currentSquare:0
          }
          ],
          stepNumber: 0,
          xIsNext: true,
     })

     function handleClick(i) {
          console.log("click,10/5/2022")
          var element = document.getElementsByClassName("square");
          // element.map(el => el.removeClass("current-select"))
          for(let j=0;j<element.length;j++)
          element[j].classList.remove("current-select")
          element[i].classList.add("current-select")
          const history = state.history.slice(0, state.stepNumber + 1);
          const current = history[history.length - 1];
          const squares = current.squares.slice();
          if (calculateWinner(squares) || squares[i]) {
          return;
          }
          squares[i] = state.xIsNext ? "X" : "O";
          setState({
          history: history.concat([
               {
               squares: squares,
               currentSquare: i
               }
          ]),
          stepNumber: history.length,
          xIsNext: !state.xIsNext,
          });
     }

     function jumpTo(step) {
          setState((prevState)=>{
          return{
               history: prevState.history,
               stepNumber: step,
               xIsNext: (step % 2) === 0
          }
          });
     }
     const history = state.history;
     const currentSquare = state.currentSquare;
     const current = history[state.stepNumber];
     const winner = calculateWinner(current.squares);   
     const moves = history.map((step, move) => {
          const desc = move ?
          `Go to move #${move}, location(${Math.floor(step.currentSquare/5)},${step.currentSquare%5})` :
          'Go to game start';
          return (
          <li key={move}>
               <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
          );
     });

     let status;
     if (winner) {
          status = "Winner: " + winner;
     }
     else if(winner===null&&state.stepNumber===25){
          status = "Draw"
     }
     else {
          status = "Next player: " + (state.xIsNext ? "X" : "O");
     }
     return (
          <div className="game">
          <div className="game-board">
               <Board
               squares={current.squares}
               onClick={i =>handleClick(i)}
               />
          </div>
          <div className="game-info">
               <div>{status}</div>
               <ol>{moves}</ol>
          </div>
          </div>
     );
   }

export default Game;
