import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="btn btn-primary h-36 w-36 m-1 text-5xl leading-9"
    >
      {value}
    </button>
  );
}

function Board({ squares, onPlay, xIsNext, currentMove }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player is " + (xIsNext ? "X" : "O");
  }

  if (currentMove > 8 && winner === null) {
    status = "Game over!";
  }

  const handleSquareClick = (index) => {
    if (squares[index] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };

  return (
    <>
      <h3 className="text-4xl font-bold mb-3 text-center">{status}</h3>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTO = (move) => {
    setCurrentMove(move);
  };

  const moves = history.map((squares, move) => {
    const description = move === 0 ? `Go to game start` : `Go to move: ${move}`;
    return (
      <li key={move}>
        <button
          onClick={() => jumpTO(move)}
          className="btn btn-warning w-full my-1"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen justify-center items-center gap-4 p-5">
      <h1 className="text-5xl font-bold text-center">Play with your Zawjah!</h1>
      <div>
        <Board
          squares={currentSquares}
          xIsNext={xIsNext}
          onPlay={handlePlay}
          currentMove={currentMove}
        />
      </div>
      <ol className="">{moves}</ol>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
