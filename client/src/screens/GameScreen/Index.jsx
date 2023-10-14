import React, { useEffect, useState } from "react";
import {
  initGame,
  gameSubject,
  resetGame,
  updateGameState,
  resetGameNew,
} from "../../utils/ChessGame";
import Board from "../../components/Board/Index";
import gameplay from "../../assets/gameplay.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import copy from "clipboard-copy";
import { Button } from "react-bootstrap";
import Header from "../../components/Header";

function GameScreen() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { socket } = userLogin;
  const { id, turn } = useParams();
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [position, setPosition] = useState();

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(windowWidth);

  useEffect(() => {
    initGame(id, socket, turn);
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setPosition(game.position);
    });
    return () => subscribe.unsubscribe();
  }, []);

  useEffect(() => {
    socket?.on("receive_update", (data) => {
      console.log(data);
      updateGameState(data.obj.update);
    });
  }, [socket]);

  const handleCopyClick = () => {
    let data1;
    if (turn === "w") {
      data1 = id + "/b";
    } else {
      data1 = id + "/w";
    }

    copy(data1)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      <Header />
      <div className="main_container">
        {windowWidth >= 1200 && (
          <div className="leftt">
            <img src={gameplay} className="limg" alt="gp" />
          </div>
        )}

        <div className="containerr mt-0">
          {isGameOver && (
            <h2 className="vertical-text">
              GAME OVER
              <button onClick={resetGame}>
                <span className="vertical-text"> NEW GAME</span>
              </button>
            </h2>
          )}

          <div className="board-container">
            <div className="br">
              {id !== "offline" && (
                <Button
                  className="b5"
                  onClick={() => {
                    handleCopyClick();
                  }}
                >
                  copy id
                </Button>
              )}
              {id === "offline" && (
                <Button
                  onClick={id !== "offline" ? resetGameNew : resetGame}
                  className="b6"
                >
                  {" "}
                  Reset Game
                </Button>
              )}
            </div>
            <Board board={board} position={position} />
          </div>
          {result && <p className="vertical-text">{result}</p>}
        </div>
      </div>
    </>
  );
}

export default GameScreen;
