import React, { useEffect, useState } from "react";
import queryString from "query-string";
import CartAPI from "../API/CartAPI";
import CheckoutAPI from "../API/CheckoutAPI";
import convertMoney from "../convertMoney";
import "./Checkout.css";
import { useForm } from "react-hook-form";

// import io from 'socket.io-client';
// const socket = io('http://localhost:5000');

function Checkout(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      fullname: "",
      phone: "",
      address: "",
    },
  });
  const [carts, setCarts] = useState([]);

  const [total, setTotal] = useState(0);

  const [success, setSuccess] = useState(false);

  const [errSer, setErrSer] = useState();

  const [load, setLoad] = useState(false);

  //Hàm này dùng để gọi API và render số sản phẩm
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const fetchData = async () => {
        const response = await CartAPI.getCarts();

        console.log(response);

        setCarts(response);

        getTotal(response);

        if (response.length === 0) {
          window.location.replace("/cart");
        }
      };

      fetchData();
    }
  }, []);

  //Hàm này dùng để tính tổng tiền carts
  function getTotal(carts) {
    let sub_total = 0;

    const sum_total = carts.map((value) => {
      return (sub_total +=
        parseInt(value.productId.price) * parseInt(value.quantity));
    });

    setTotal(sub_total);
  }

  //Check Validation
  // const handlerSubmit = () => {
  //   if (!fullname) {
  //     setFullnameError(true);
  //     setEmailError(false);
  //     setPhoneError(false);
  //     setAddressError(false);
  //     return;
  //   } else {
  //     if (!email) {
  //       setFullnameError(false);
  //       setEmailError(true);
  //       setPhoneError(false);
  //       setAddressError(false);
  //       return;
  //     } else {
  //       setPhoneError(false);
  //       setAddressError(false);
  //       setFullnameError(false);

  //       if (!validateEmail(email)) {
  //         setEmailRegex(true);
  //         setFullnameError(false);
  //         setEmailError(false);
  //         setPhoneError(false);
  //         setAddressError(false);
  //         return;
  //       } else {
  //         setEmailRegex(false);

  //         if (!phone) {
  //           setFullnameError(false);
  //           setEmailError(false);
  //           setPhoneError(true);
  //           setAddressError(false);
  //           return;
  //         } else {
  //           setFullnameError(false);
  //           setEmailError(false);
  //           setPhoneError(false);
  //           setAddressError(false);

  //           if (!address) {
  //             setFullnameError(false);
  //             setEmailError(false);
  //             setPhoneError(false);
  //             setAddressError(true);
  //           } else {
  //             console.log("Thanh Cong");

  //             setLoad(!load);
  //           }
  //         }
  //       }
  //     }
  //   }
  // };
  const handlerSubmit = (data) => {
    setLoad(true);
    console.log(data);
    CheckoutAPI.postEmail(data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoad(false);
          setSuccess(true);
        } else {
          setLoad(false);
          setSuccess(false);
          throw new Error(res.statusText);
        }
      })
      .catch((err) => setErrSer(err.toString()));
  };
  //Hàm này bắt đầu gửi Email xác nhận đơn hàng
  // useEffect(() => {
  //   if (load) {
  //     const sendMail = async () => {
  //       // const params = {
  //       //   to: email,
  //       //   fullname: fullname,
  //       //   phone: phone,
  //       //   address: address,
  //       //   idUser: localStorage.getItem("userId"),
  //       // };
  //       // const query = "?" + queryString.stringify(params);
  //       // const response = await CheckoutAPI.postEmail(query);
  //       // console.log(response);
  //     };

  //     sendMail();

  //     const data = localStorage.getItem("userId");

  //     // Gửi socket lên server
  //     //   socket.emit("send_order", data);

  //     //Dùng setTimeout delay 3s
  //     //Sau 4s nó sẽ thực hiện
  //     setTimeout(() => {
  //       setSuccess(!success);
  //       setLoad(!load);
  //     }, 4000);
  //   }
  // }, [load]);

  return (
    <div>
      {load && (
        <div className="wrapper_loader">
          <div className="loader"></div>
        </div>
      )}

      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Checkout</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="cart.html">Cart</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {!success && (
          <section className="py-5" onSubmit={handleSubmit(handlerSubmit)}>
            <h2 className="h5 text-uppercase mb-4">Billing details</h2>
            <div className="row">
              <div className="col-lg-8">
                <form>
                  <div className="row">
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Fullname"
                      >
                        Full Name:
                      </label>
                      <input
                        className="form-control form-control-lg"
                        {...register("fullname", {
                          required: "Your fullname is required",
                        })}
                        type="text"
                        placeholder="Enter Your Full Name Here!"
                      />
                      {errors.fullname && (
                        <span className="text-danger">
                          * {errors.fullname.message}!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Email"
                      >
                        Email:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Email Here!"
                        {...register("email", {
                          required: "Your email is required",
                        })}
                      />
                      {errors.email && (
                        <span className="text-danger">
                          * {errors.email.message}!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Phone"
                      >
                        Phone Number:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Phone Number Here!"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                      />
                      {errors.phone && (
                        <span className="text-danger">
                          * {errors.phone.message}!
                        </span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Address"
                      >
                        Address:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Address Here!"
                        {...register("address", {
                          required: "Your address is required",
                        })}
                      />
                      {errors.address && (
                        <span className="text-danger">
                          * {errors.address.message}!
                        </span>
                      )}
                    </div>
                    {errSer && <span className="text-danger">* {errSer}!</span>}
                    <div className="col-lg-12 form-group">
                      <a
                        className="btn btn-dark"
                        style={{ color: "white" }}
                        type="submit"
                        onClick={handleSubmit(handlerSubmit)}
                      >
                        Place order
                      </a>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h5 className="text-uppercase mb-4">Your order</h5>
                    <ul className="list-unstyled mb-0">
                      {carts &&
                        carts.map((value) => (
                          <div key={value.productId._id}>
                            <li className="d-flex align-items-center justify-content-between">
                              <strong className="small font-weight-bold">
                                {value.productId.name}
                              </strong>
                              <br></br>
                              <span className="text-muted small">
                                {convertMoney(value.productId.price)} VND x{" "}
                                {value.quantity}
                              </span>
                            </li>
                            <li className="border-bottom my-2"></li>
                          </div>
                        ))}
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Total
                        </strong>
                        <span>{convertMoney(total)} VND</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {success && (
          <section className="py-5">
            <div className="p-5">
              <h1>You Have Successfully Ordered!</h1>
              <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Checkout;
