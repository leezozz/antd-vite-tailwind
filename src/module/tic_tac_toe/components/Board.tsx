import Square from "./Square";
import { createStyles } from "antd-style";
import { useState } from 'react'

const useStyle = createStyles({
  'board-row': {
    'board-row:after': {
      clear: 'both',
      content: '""',
      display: 'table',
    }
  }
})
const Board: React.FC = () => {
  const { styles } = useStyle()
  const [xIsNext, setXIsNext] = useState(true)
  let status
  const [squares, setSquares] = useState(Array(9).fill(null))



  const calculateWinner = (squares: string | null[]) => {
    console.log('calculateWinner', squares)

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const Winner = calculateWinner(squares)
    if (Winner) {
      status = "Winner: " + Winner
    } else {
      status = "Next player: " + (xIsNext ? 'X' : 'O')
    }

  const handleClick = (i: number) => {
    console.log('click', i, Winner, squares[i])
    
    // 当有玩家胜出，或已经被点击过，该函数不做任何处理直接返回
    if (Winner || squares[i]) {
      return
    }
    
    // 调用slice()方法创建了squares数组的一个副本，而不是直接在现有的数组上进行修改
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

  const renderSquare = (i: number) => {
    console.log("i", i);
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <div className="status" style={{marginBottom: '10px'}}>{status}</div>
      <div className={styles['board-row']}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles['board-row']}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles['board-row']}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
export default Board;
