import React from "react";
import Header from "../../components/Header";
import "./index.css";
import chess from "../../assets/chess.png";
import {Button} from "react-bootstrap"


const Homepage = () => {
  return (
    <>
      <Header />
      <div className="homepage_header">
        <div className="left_header">
          <div className="left_header_heading">Welcome to Pro Chess</div>

          <div className="left_header_button">
            <Button className="b1">Online Mode</Button>

            <Button className="b2">Offline Mode</Button>
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
