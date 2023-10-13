import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dropdown from "../../assets/dropdown.svg";
import io from "socket.io-client"



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
      setIsDisabled(false);
    }
  }, [keyword]);

  return (
    <>
      <div className="container">
        <div className="info">
          <button className="info-button">
            Create New Game
            <img src={dropdown} alt="" />
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
                className="btn"
                onClick={submitHandler}
                disabled={isdisabled}
              >
                Play
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SelectOnline;
