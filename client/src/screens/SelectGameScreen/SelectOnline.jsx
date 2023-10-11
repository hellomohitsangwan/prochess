import React, { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import dropdown from "../../assets/dropdown.svg";

function SelectOnline() {
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
    <>
      <div className="container">
        <div className="info">
          <button className="info-button">
            Select Color
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

        <h2 style={{marginRight: "32px"}}>OR</h2>
        <FormContainer>
          <h1>Select Game Type</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Game Type</Form.Label>

              <Col>
                <Form.Check
                  type="radio"
                  label="Offline Game"
                  id="gameMethodOffline"
                  name="gameMethod"
                  value="offline"
                  onChange={(e) => setGameType(e.target.value)}
                ></Form.Check>
                <Form.Check
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
              className="cont"
              type="submit"
              variant="primary"
              disabled={isdisabled}
            >
              Continue
            </Button>
          </Form>
        </FormContainer>
      </div>
    </>
  );
}

export default SelectOnline;
