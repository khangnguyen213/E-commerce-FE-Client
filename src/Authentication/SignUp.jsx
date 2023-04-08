import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import "./Auth.css";
import { useForm } from "react-hook-form";

SignUp.propTypes = {};

function SignUp() {
  const [serErr, setSerErr] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    const requestBody = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: "user",
    };
    console.log(requestBody);
    UserAPI.postSignUp(requestBody)
      .then(() => {
        return navigate("/signin");
      })
      .catch((err) => setSerErr(err.response.statusText));
  };
  //  // Hàm này dùng để tạo các conversation cho user và admin
  //  const fetchConversation = async () => {
  //   const params = {
  //     email: email,
  //     password: password,
  //   };

  //   const query = "?" + queryString.stringify(params);

  //   const response = await MessengerAPI.postConversation(query);
  //   console.log(response);
  // };

  // fetchConversation();

  return (
    <div className="limiter">
      <div className="container-login100">
        <div
          className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="login100-form-title p-b-33">Sign Up</span>
          <div className="d-flex justify-content-center pb-5">
            {/* {errorFullname && (
              <span className="text-danger">
                * Please Check Your Full Name!
              </span>
            )}
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email!</span>
            )}
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password!</span>
            )}
            {errorPhone && (
              <span className="text-danger">
                * Please Check Your Phone Number!
              </span>
            )} */}
          </div>
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              type="text"
              placeholder="Fullname"
              {...register("fullname", { required: "Full name is required" })}
            />
          </div>
          {errors.fullname && (
            <span className="text-danger">{errors.fullname.message}</span>
          )}
          <div className="wrap-input100 rs1 validate-input">
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
          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="text"
              placeholder="Phone number"
              {...register("phone", { required: "Phone number is required" })}
            />
          </div>
          {errors.phone && (
            <span className="text-danger">{errors.phone.message}</span>
          )}
          {setSerErr && <span className="text-danger">{serErr}</span>}

          <div className="container-login100-form-btn m-t-20">
            <button
              className="login100-form-btn"
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Login?</span>
            &nbsp;
            <Link to="/signin" className="txt2 hov1">
              Click
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
