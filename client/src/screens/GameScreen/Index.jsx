import React, { useEffect, useState } from "react";
import { initGame, gameSubject, resetGame } from "../../utils/ChessGame";
import Board from "../../components/Board/Index";
import gameplay from "../../assets/gameplay.png";

function GameScreen() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);

  return (
    <div className="main_container">
      <div className="leftt">
        <img src={gameplay} className="limg" alt="gp" />
      </div>
      <div className="containerr">
        {isGameOver && (
          <h2 className="vertical-text">
            GAME OVER
            <button onClick={resetGame}>
              <span className="vertical-text"> NEW GAME</span>
            </button>
          </h2>
        )}

        <div className="board-container">
          <Board board={board} turn={turn} />
        </div>
        {result && <p className="vertical-text">{result}</p>}
      </div>
    </div>
  );
}

export default GameScreen;
