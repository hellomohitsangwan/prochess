import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dropdown from "../../assets/dropdown.svg";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import ps from "../../assets/ps.png";
import "./Index.css";
import Header from "../../components/Header";
// import { resetGameNew } from "../../utils/ChessGame";

function SelectOnline() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(windowWidth);

  const userLogin = useSelector((state) => state.userLogin);
  const { socket } = userLogin;
  const navigate = useNavigate();
  const [isdisabled, setIsDisabled] = useState(true);
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    keyword && navigate(`/play/${keyword}`);
  };

  const joinRoom = (type) => {
    const unique_id = uuid();
    // resetGameNew();
    socket?.emit("join_room", unique_id);
    navigate(`/play/${unique_id}/${type}`);
  };
  const joinRoomPlay = (id) => {
    let arr = id.split("/");
    // resetGameNew();
    // console.log(arr);
    socket.emit("join_room", arr[0]);
    navigate(`/play/${arr[0]}/${arr[1]}`);
  };

  useEffect(() => {
    if (keyword === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [keyword]);

  return (
    <>
      <Header />
      <div className="maincont">
        {windowWidth >= 1200 && (
          <div className="left">
            <img style={{ width: "24rem" }} src={ps} alt="img" />
          </div>
        )}
        <div className="right">
          <div className="info">
            <button className="info-button">
              Create New Game
              <img style={{ marginLeft: "8px" }} src={dropdown} alt="" />
            </button>
            <ul>
              <li
                onClick={() => {
                  joinRoom("b");
                }}
              >
                Black
              </li>
              <li>
                <li
                  onClick={() => {
                    joinRoom("w");
                  }}
                >
                  White
                </li>
              </li>
            </ul>
          </div>

          <h2 style={{ marginRight: "32px" }}>OR</h2>

          <form>
            <div className="input-group">
              <input
                type="text"
                id="search_field"
                className="form-control"
                placeholder="Enter Game ID ...."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  id="search_btn"
                  className="b4"
                  onClick={() => {
                    joinRoomPlay(keyword);
                  }}
                  disabled={isdisabled}
                >
                  Play
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SelectOnline;
