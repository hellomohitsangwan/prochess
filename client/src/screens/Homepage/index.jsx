import React from "react";
import Header from "../../components/Header";
import "./index.css";
import chess from "../../assets/chess.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="homepage_header">
        <div className="left_header">
          <div className="left_header_heading">Welcome to Pro Chess</div>

          <div className="left_header_button">
            <Button
              className="b1"
              onClick={() => navigate("/play/offline/off")}
            >
              Offline Mode
            </Button>

            <Button className="b2" onClick={() => navigate("/select/online")}>
              Online Mode
            </Button>
          </div>
        </div>
        <div className="right_header">
          <img alt="img_chess" className="right_header_img" src={chess} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
