import React, { useState } from "react";
import "./TicTacToe.css";

function TicTacToe() {
    const [turn, setTurn] = useState("X");                    // turn - Represents the current player's turn (either "X" or "O").
    const [cells, setCells] = useState(Array(9).fill(""));    // cells - An array representing the Tic-Tac-Toe grid.
    const [winner, setWinner] = useState();                   // winner - Keeps track of the winner of the game.
    const winning_combinations = {
        horizontal: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
        vertical: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
        diagonal: [[0, 4, 8], [2, 4, 6]]
    }

    const handleClick = (num) => {
        if (winner || cells[num] !== "") return;   // cell already clicked

        let arr = [...cells];

        arr[num] = turn;
        setTurn(turn === "X" ? "O" : "X");
        checkWinner(arr)
        setCells(arr)
    }

    const checkWinner = (arr) => {
        let hasWinner = false;
        for (let comb in winning_combinations) {
            winning_combinations[comb].forEach(pattern => {
                if (arr[pattern[0]] === arr[pattern[1]] && arr[pattern[1]] === arr[pattern[2]]) {
                    setWinner(arr[pattern[0]])
                    hasWinner = true
                }
            });
        }

        // Check for draw if there's no winner and all cells are filled
        if (!hasWinner && arr.every(cell => cell !== "")) {
            setWinner("Draw");
        }
    };

    const handleReset = () => {
        setTurn("X");
        setCells(Array(9).fill(""));
        setWinner();
    }

    return (
        <div className="tic-tac-toe">
            <div className="board">
                {cells.map((cell, index) => (
                    <div key={index} className="cell" onClick={() => handleClick(index)}>
                        {cell}
                    </div>
                ))}
            </div>
            <div className="game-status">
                {winner && winner !== "Draw" && <div className="winner">Winner: {winner}</div>}
                {winner && winner === "Draw" && <div className="draw">It's a draw!</div>}
                {!winner && <div className="turn">Turn: {turn}</div>}
            </div>

            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default TicTacToe;