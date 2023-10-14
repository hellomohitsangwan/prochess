import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import dropdown from "../../assets/dropdown.svg";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import ps from "../../assets/ps.png";
import "./Index.css";
import Header from "../../components/Header";
// import { resetGameNew } from "../../utils/ChessGame";

function SelectOnline() {
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
    navigate(`/play/${unique_id}/${type}`);
    socket.emit("join_room", unique_id);
  };
  // const joinRoomPlay = (id) => {
  //   let arr = id.split("/");
  //   // resetGameNew();
  //   // console.log(arr);
  //   navigate(`/play/${arr[0]}/${arr[1]}`);
  //   socket.emit("join_room", arr[0]);
  // };

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
        <div className="left">
          <img style={{ width: "24rem" }} src={ps} alt="img" />
        </div>

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
                  onClick={submitHandler}
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
