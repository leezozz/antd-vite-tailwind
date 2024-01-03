import Square from "./Square";
import { Fragment } from 'react';
interface Props {
  squares: string | null[];
  highPath: number[];
  onClick: (i: number, coordinate: number[]) => void;
}

const Board: React.FC<Props> = ({ squares, highPath, onClick }) => {
  const checkerboard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const renderSquare = (i: number, row: number, column: number) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        highLight={highPath.includes(i)}
        onClick={() => onClick(i, [row, column])}
      />
    );
  };

  return (
    <div>
      {checkerboard.map((item, index) => {
        return (
          <Fragment key={index}>
            {item.map((t, tIndex) => renderSquare(t, index + 1, tIndex + 1))}
            <br />
          </Fragment>
        );
      })}
    </div>
  );
};
export default Board;
