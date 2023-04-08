import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { deleteSession } from "../Redux/Action/ActionSession";

function LogoutLink() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    console.log("Log out");
    UserAPI.getOut().then(() => {
      localStorage.clear();
      const action = deleteSession("");
      dispatch(action);
      navigate("/signin");
    });
  };

  return (
    <li
      className="nav-item"
      style={{ cursor: "pointer" }}
      onClick={clickHandler}
    >
      <div className="nav-link">( Logout )</div>
    </li>
  );
}

export default LogoutLink;
