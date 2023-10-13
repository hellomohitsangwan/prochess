import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dropdown from "../../assets/dropdown.svg";
import io from "socket.io-client";
import ps from "../../assets/ps.png";
import "./Index.css";
import Header from "../../components/Header";

function SelectOnline() {
  const navigate = useNavigate();
  const [isdisabled, setIsDisabled] = useState(true);
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    keyword && navigate(`/play/${keyword}`);
  };

  useEffect(() => {
    if (keyword === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false );
    }
  }, [keyword]);

  return (
    <>
    <Header />
      <div className="maincont">
        <div className="left">
          <img style={{width: "24rem"}} src={ps} alt="img" />
        </div>

        <div className="right">
          <div className="info">
            <button className="info-button">
              Create New Game
              <img style={{marginLeft: "8px"}} src={dropdown} alt="" />
            </button>
            <ul>
              <li>
                <Link to="/play/online">Black</Link>
              </li>
              <li>
                <li>
                  <Link to="/play/online">White</Link>
                </li>
              </li>
            </ul>
          </div>

          <h2 style={{ marginRight: "32px" }}>OR</h2>

          <form onSubmit={submitHandler}>
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
