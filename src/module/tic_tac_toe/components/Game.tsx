import Board from "./Board"

const Game: React.FC = () => {

  return (
    <>
      <div className="game flex flex-row">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info ml-[20px]">
          <div>{/* status */}</div>
          <ol className="pl-[30px]">{/* TODO */}</ol>
        </div>
      </div>
    </>  
  )
}
export default Game