import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import "./components.css";
import dropdown from "../assets/dropdown.svg";
import header from "../assets/header.png"

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-center">
        <div className="nav-rightt">
          <Link to="/">
          <img alt="logo" className = "logo" src={header}></img> </Link>
          <Link to="/">
          <h3 className="headerr">Pro Chess</h3>
          </Link>
          </div>
          <ul className="nav-links">
            {userInfo ? (
              <div className="info">
                <button className="info-button">
                  Hi! {userInfo.name.split(" ")[0]}{" "}
                  <img src={dropdown} alt="" />
                </button>
                <ul>
                  <li>
                    <Link to="/select">Play</Link>
                  </li>
                  <li>
                    <p onClick={logoutHandler} className="logout">
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">SignIn</Link>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
