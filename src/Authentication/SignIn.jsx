import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { addSession } from "../Redux/Action/ActionSession";
import "./Auth.css";
import { useForm } from "react-hook-form";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errSer, setErrSer] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    const requestBody = {
      email: data.email,
      password: data.password,
    };
    UserAPI.postSignIn(requestBody)
      .then((res) => {
        localStorage.userId = res.id;
        localStorage.fullname = res.fullname;
        const action = addSession(res.id);
        dispatch(action);
        return navigate("/");
      })
      .catch((err) => setErrSer(err.response.statusText));
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div
          className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="login100-form-title p-b-33">Sign In</span>

          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}

          {errSer && <span className="text-danger">{errSer}</span>}

          <div className="container-login100-form-btn m-t-20">
            <button
              className="login100-form-btn"
              onClick={handleSubmit(onSubmit)}
            >
              Sign in
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
