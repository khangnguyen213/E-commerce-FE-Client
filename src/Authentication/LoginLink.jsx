import React from "react";
import { Link } from "react-router-dom";

function LoginLink() {
  return (
    <li className="nav-item" style={{ cursor: "pointer" }}>
      <Link className="nav-link" to="/signin">
        Login
      </Link>
    </li>
  );
}

export default LoginLink;
