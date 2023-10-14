import React from "react";
import Header from "../../components/Header";
import "./index.css";
import chess from "../../assets/chess.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Homepage = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Header />
      <div className="homepage_header">
        <div className="left_header">
          <div className="left_header_heading">Welcome to Pro Chess</div>

          <div className="left_header_button">
            {userInfo ? (
              <>
                {" "}
                <Button
                  className="b1"
                  onClick={() => navigate("/play/offline/off")}
                >
                  Offline Mode
                </Button>
                <Button
                  className="b2"
                  onClick={() => navigate("/select/online")}
                >
                  Online Mode
                </Button>
              </>
            ) : (
              <>
                <Button className="b1" onClick={() => navigate("register")}>
                  Register
                </Button>
              </>
            )}
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
