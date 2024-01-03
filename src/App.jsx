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
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const [isDraw, setIsDraw] = useState(false);
	const winner = calculateWinner(squares);
	let status;

	function handleClick(i) {
		//returns out of the click event (makes it disabled) if square already clicked/win/draw.
		// kind of like 'break' in loop
		if (squares[i] || calculateWinner(squares) || isDraw) {
			return;
		}

		//use slice to copy squares array and modifying the copy instead of the original for 'immutability'
		const squaresContent = squares.slice();

		//replace null with X/O in the index clicked
		if (xIsNext === true) {
			squaresContent[i] = "X";
		} else if (xIsNext === false) {
			squaresContent[i] = "O";
		}

		//declare varieble of how many empty squares left
		const squaresLeft = squaresContent.filter((square) => square === null);

		//if no empty squares laft set state of draw
		if (squaresLeft.length === 0 && calculateWinner(squares) === null) {
			setIsDraw(true);
		}

		//replace square array with new array containing one replaced value
		//set next player to opposite of who played before
		setSquares(squaresContent);
		setXIsNext(!xIsNext);
	}

	//check if isDraw/winner is true to change status
	if (isDraw) {
		status = "DRAW";
	}

	if (winner) {
		status = "WINNER " + winner;
	} else {
		status = xIsNext ? "X" : "O";
	}

	//resets all the states
	function handleClickReplay() {
		setSquares(Array(9).fill(null));
		setIsDraw(false);
		setXIsNext(true);
	}

	return (
		//using arrow functions inside click events, otherwise the event goes off directly
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
			<button className="replay-btn" onClick={() => handleClickReplay()}>
				<img className="replay-btn__img" src="./replay.png" alt="replay icon" />
			</button>
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
