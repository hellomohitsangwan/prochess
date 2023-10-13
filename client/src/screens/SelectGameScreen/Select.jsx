import React, { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import multimode from "../../assets/multimode.svg";
import Header from "../../components/Header";
import "./Index.css"

function Select() {
  const navigate = useNavigate();
  const [gameType, setGameType] = useState("");
  const [isdisabled, setIsDisabled] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    if (gameType) {
      gameType === "offline"
        ? navigate("/play/offline")
        : navigate("/select/online");
    }
  };

  useEffect(() => {
    if (gameType === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [gameType]);

  return (
    <div className="containerrr">
      <Header/>
      <div className="homepage_header">
        <div className="left_header">
          <Form onSubmit={submitHandler}>
            <Form.Group>
            <div className="left_header_headingg">Select Game Type</div>

              <Col>
                <Form.Check
                className="options"
                  type="radio"
                  label="Offline Game"
                  id="gameMethodOffline"
                  name="gameMethod"
                  value="offline"
                  onChange={(e) => setGameType(e.target.value)}
                ></Form.Check>
                <Form.Check
                className="options"
                  type="radio"
                  label="Online(With friend)"
                  id="gameMethodOnline"
                  name="gameMethod"
                  value="online"
                  onChange={(e) => setGameType(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
            <Button
              className="b3"
              type="submit"
              variant="primary"
              disabled={isdisabled}
            >
              Continue
            </Button>
          </Form>
        </div>
        <div className="right_header">
          <img alt="img_chess" className="right_header_img" src={multimode} />
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default Select;
