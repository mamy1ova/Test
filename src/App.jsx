import React, { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onClick }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onClick(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = '«Победитель игры» : ' + winner;
  } else {
    status = 'Следующий ход     : ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function Accordion() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h2>Игра Крестики Нолики</h2>
        <span className="plusMinus">{isOpen ? '⬆' : '⬇'}</span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <p>
            Суть игры состоит в том, что нужно поставить три своих значка по
            вертикали, <br /> горизонтали или диагонали. <br /> Попытайтесь
            обмануть соперника и сделать так, <br /> чтобы следующий шаг дал вам
            возможность в один ход победить противника в любой комбинации.
            <br /> Приятной игры и удачи!
          </p>
        </div>
      )}
    </div>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    nextHistory.push(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // Проверяем, есть ли победитель или ничья
    const winner = calculateWinner(nextSquares);
    if (!winner && nextSquares.every((square) => square)) {
      // Если нет победителя и все ячейки заполнены, то это ничья
      alert('Ничья хотите играть заново ? ');
    }
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((step, move) => {
    const description = move ? 'Go to move #' + move : 'Играть заново';
    return (
      <li className="list" key={move}>
        <button className="centered"  onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <Accordion />
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onClick={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
