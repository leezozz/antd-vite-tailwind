import Square from "./Square";
import { createStyles } from "antd-style";

interface Props {
  squares: string | null[];
  onClick: (i: number, coordinate: number[]) => void;
}

const useStyle = createStyles({
  "board-row": {
    "board-row:after": {
      clear: "both",
      content: '""',
      display: "table",
    },
  },
});
const Board: React.FC<Props> = ({ squares, onClick }) => {
  const { styles } = useStyle();

  const renderSquare = (i: number, row: number, column: number) => {
    return <Square value={squares[i]} onClick={() => onClick(i, [row, column])} />;
  };

  const checkerboard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  return (
    <div>
      {checkerboard.map((item, index) => {
        return (
          <>
            {item.map((t, tIndex) =>
              renderSquare(t, index+1, tIndex + 1),
            )}
            <br />
          </>
        );
      })}
    </div>
  );
};
export default Board;
