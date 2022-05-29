import React, { useState, Fragment } from "react";
import "./Login.scss";
import Companies from "../Companies/Companies";
import { usersServices } from "../../services/UsersServices";
import { userLogin, token } from "../../config/settings";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { signInAction } from "../../redux/actions/UserManagementAction";
import ScrollAnimation from "react-animate-on-scroll";
export default function Login(props) {
  let { navigator } = props;
  if (localStorage.getItem("userLogin")) {
    navigator.history.push("/");
  }
  const dispatch = useDispatch();

  let [status, setStatus] = useState({ currentView: "logIn", currentTitle: "Login" });
  let [state, setState] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP08",
      email: "",
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      email: "",
    },
  });

  let [loginState, setLoginState] = useState({
    values: {
      taiKhoan: "",
      matKhau: "",
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  const handleInput = (e) => {
    var { value, name } = e.target;
    let newValues = { ...state.values, [name]: value };
    let newValuesLogin = { ...loginState.values, [name]: value };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "This field unempty !" : "",
    };
    let newErrorsLogin = {
      ...loginState.errors,
      [name]: value === "" ? "This field unempty !" : "",
    };
    setState({ values: newValues, errors: newErrors });
    setLoginState({ values: newValuesLogin, errors: newErrorsLogin });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    let valid = true;
    let { values, errors } = loginState;
    for (let key in values) {
      if (values[key] === "") {
        valid = false;
      }
    }
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
      }
    }
    if (!valid) {
      alert("Invalid information");
      return;
    }

    usersServices
      .logIn(values)
      .then((result) => {
        localStorage.setItem(userLogin, JSON.stringify(result.data));
        localStorage.setItem(token, result.data.accessToken);
        dispatch(signInAction(result.data.taiKhoan, values.matKhau));
        swal({
          title: "Login successful",
          text: "Hello " + result.data.taiKhoan,
          icon: "success",
          button: "OK",
        });
        navigator.history.push("/");
      })
      .catch((err) => {
        swal({
          title: err.response.data,
          icon: "error",
          button: "OK",
        });
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let valid = true;
    let { values, errors } = state;
    for (let key in values) {
      if (values[key] === "") {
        valid = false;
      }
    }
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
      }
    }
    if (!valid) {
      alert("Invalid information");
      return;
    }

    usersServices
      .signUp(values)
      .then(() => {
        swal({
          title: "Sign up successful",
          icon: "success",
          button: "OK",
        });
        setStatus({ currentView: "logIn", currentTitle: "Welcome Back" });
      })
      .catch((err) => {
        swal({
          title: err.response.data,
          icon: "warning",
          button: "OK",
        });
      });
  };
  let changeView = (view, title) => {
    setStatus({
      currentView: view,
      currentTitle: title,
    });
  };
  const currentView = () => {
    switch (status.currentView) {
      case "signUp":
        return (
          <form className="formUser form-signup" onSubmit={handleSignUp}>
            <h2 className="form-title">
              <ScrollAnimation animateIn="bounce" duration="1">
                {status.currentTitle}
              </ScrollAnimation>
            </h2>
            <ScrollAnimation animateIn="zoomIn" duration="1">
              <fieldset>
                <legend>Create Account</legend>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label for="username">Username:</label>
                        <input
                          type="text"
                          name="taiKhoan"
                          id="username"
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.taiKhoan}
                        </span>
                      </li>
                      <li className="control-form-item">
                        <label for="email">Email:</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.email}
                        </span>
                      </li>
                      <li className="control-form-item">
                        <label for="password">Password:</label>
                        <input
                          type="password"
                          name="matKhau"
                          id="password"
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.matKhau}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label for="name">Name:</label>
                        <input
                          type="text"
                          name="hoTen"
                          id="name"
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.hoTen}
                        </span>
                      </li>
                      <li className="control-form-item">
                        <label for="phone">Phone:</label>
                        <input
                          type="tel"
                          name="soDT"
                          id="phone"
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">{state.errors.soDT}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </fieldset>
            </ScrollAnimation>
            <button>Submit</button>
            <button type="button" onClick={() => changeView("logIn", "Login")}>
              Have an Account?
            </button>
          </form>
        );
      case "logIn":
        return (
          <form className="formUser form-login" onSubmit={handleLogIn}>
            <h2 className="form-title">
              <ScrollAnimation animateIn="bounce" duration="1">
                {status.currentTitle}
              </ScrollAnimation>
            </h2>
            <fieldset>
              <ScrollAnimation animateIn="flipInY" duration="1">
                <legend>Log In</legend>
                <ul className="control-form-list">
                  <li className="control-form-item">
                    <label for="username">Username:</label>
                    <input
                      type="text"
                      name="taiKhoan"
                      id="username"
                      onChange={handleInput}
                      required
                    />
                    <span className="text-danger">{state.errors.taiKhoan}</span>
                  </li>
                  <li className="control-form-item">
                    <label for="password">Password:</label>
                    <input
                      type="password"
                      name="matKhau"
                      id="password"
                      onChange={handleInput}
                      required
                    />
                    <span className="text-danger">{state.errors.matKhau}</span>
                  </li>
                </ul>
              </ScrollAnimation>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => changeView("signUp", "Sign Up")}>
              Create an Account
            </button>
          </form>
        );
      default:
        break;
    }
  };
  return (
    <Fragment>
      <section id="entry-page">{currentView()}</section>
      <Companies />
    </Fragment>
  );
}
