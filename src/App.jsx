import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
	return (
		<button onClick={onSquareClick} className="square">
			{value}
		</button>
	);
}

export default function Board() {
	//useState hooks to remember turn and placement
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);

	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();

		if (xIsNext === true) {
			nextSquares[i] = "X";
		} else if (xIsNext === false) {
			nextSquares[i] = "O";
		}

		setSquares(nextSquares);
		setXIsNext(!xIsNext);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'WINNER ' + winner;
	} else {
		status = xIsNext ? "X" : "O";
	}

	return (
		<>
			<p className="status">{status}</p>
			<div className="board-grid">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}

function calculateWinner(squares) {
	//win combinations
	const winLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < winLines.length; i++) {
		//destructure the current line into three variebles
		const [a, b, c] = winLines[i];

		//if b and c has the same value as a (X/O)
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			//return winning symbol
			return squares[a];
		}
	}

	//else return null
	return null;
}
