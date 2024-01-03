import { useState, useRef } from "react";
import Board from "./Board";
import { createStyles, cx } from "antd-style";

interface History {
  squares: string | null[];
  coordinate: number[];
}

const useStyle = createStyles({
  "current-selected-history-item": {
    fontWeight: "bold",
  },
});

const Game: React.FC = () => {
  const { styles } = useStyle();
  // 状态提升，把Board组件的状态提升到Game父组件中。根据history渲染历史步骤
  const [history, setHistory] = useState<History[]>([
    { squares: Array(9).fill(null), coordinate: [] },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  // true：升序； false：降序
  const [sortBtn, setSortBtn] = useState(true);
  const highLight = useRef<number[]>([])

  const calculateWinner = (squares: string | null[]) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        highLight.current = [a, b, c];
        return squares[a];
      }
    }
    return null;
  };

  let status;
  const current = history[stepNumber];
  const Winner = calculateWinner(current.squares);
  if (Winner) {
    status = "Winner: " + Winner;
  } else if (stepNumber === 9) {
    status = "平局";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i: number, coordinate: number[]) => {
    console.log("点击", i, coordinate);
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    // 调用slice()方法创建了squares数组的一个副本，而不是直接在现有的数组上进行修改
    const newSquares = current.squares.slice();

    // 当有玩家胜出，或已经被点击过，该函数不做任何处理直接返回
    if (calculateWinner(current.squares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O";
    setHistory(
      history.concat([
        {
          squares: newSquares,
          coordinate: coordinate,
        },
      ]),
    );
    setXIsNext(!xIsNext);
    setStepNumber(newHistory.length);
  };

  const jumpTo = (step: number) => {
    console.log("jumpTo", step);
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move
      ? "Go to move #" + move + " 坐标：[" + step.coordinate + "]"
      : "Go to game start";
    return (
      <li key={move}>
        <span>{move}</span>
        <button
          className={cx({
            [styles["current-selected-history-item"]]: move === stepNumber,
          })}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  const handleSort = () => {
    setSortBtn(!sortBtn);
  };

  return (
    <>
      <div className="game flex flex-row">
        <div className="game-board">
          <Board
            squares={current.squares}
            highPath={highLight.current}
            onClick={handleClick}
          />
        </div>
        <div className="game-info ml-[20px]">
          <div>{status}</div>
          <div>
            <button onClick={handleSort}>{sortBtn ? "降序" : "升序"}</button>
          </div>
          <ul className="list-none pl-[30px]">
            {sortBtn ? moves : [...moves].reverse()}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Game;
