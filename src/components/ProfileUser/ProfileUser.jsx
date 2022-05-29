import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "./ProfileUser.scss";
import { Redirect } from "react-router-dom";
import { usersServices } from "../../services/UsersServices";
import swal from "sweetalert";
import { useSelector } from "react-redux";
export default function ProfileUser(props) {
  let [info] = useState({
    taiKhoan: useSelector((state) => state.UserManagementReducer.taiKhoan),
    matKhau: useSelector((state) => state.UserManagementReducer.matKhau),
  });
  let [stateChange, setStateChange] = useState({
    values: {
      chiTietKhoaHocGhiDanh: [],
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP08",
      maLoaiNguoiDung: "HV",
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

  useEffect(() => {
    usersServices
      .getInfoUser(info)
      .then((res) => {
        setStateChange({
          values: res.data,
          errors: {
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            soDT: "",
            email: "",
          },
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [info]);
  if (!localStorage.getItem("userLogin")) {
    return <Redirect to="/" />;
  }
  const handleInput = (e) => {
    var { value, name } = e.target;
    let newValues = { ...stateChange.values, [name]: value };
    let newErrors = {
      ...stateChange.errors,
      [name]: value === "" ? "This field unempty !" : "",
    };
    setStateChange({ values: newValues, errors: newErrors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let { values, errors } = stateChange;
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
    swal({
      title: "Are you sure?",
      text: "Change infomation",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        usersServices
          .updateInfoUser(values)
          .then((res) => {
            swal({
              title: "Update successful",
              icon: "success",
              button: "OK",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((err) => {
            swal({
              title: err.response.data,
              icon: "error",
              button: "OK",
            });
          });
      } else {
        swal("Ohh!");
      }
    });
  };
  return (
    <section className="entry-page">
      <form className="formUser form-change" onSubmit={handleSubmit}>
        <h2 className="form-title">Change Information</h2>
        <ScrollAnimation animateIn="zoomIn" duration="1">
          <fieldset>
            <ul className="control-form-list">
              <li className="control-form-item">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="taiKhoan"
                  id="username"
                  value={stateChange.values.taiKhoan}
                  onChange={handleInput}
                  required
                />
                <span className="text-danger">
                  {stateChange.errors.taiKhoan}
                </span>
              </li>
              <li className="control-form-item">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="hoTen"
                  id="name"
                  value={stateChange.values.hoTen}
                  onChange={handleInput}
                  required
                />
                <span className="text-danger">{stateChange.errors.hoTen}</span>
              </li>
              <li className="control-form-item">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={stateChange.values.email}
                  onChange={handleInput}
                  required
                />
                <span className="text-danger">{stateChange.errors.email}</span>
              </li>
              <li className="control-form-item">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="matKhau"
                  id="password"
                  value={stateChange.values.matKhau}
                  onChange={handleInput}
                  required
                />
                <span className="text-danger">
                  {stateChange.errors.matKhau}
                </span>
              </li>
              <li className="control-form-item">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  name="soDT"
                  id="phone"
                  value={stateChange.values.soDT}
                  onChange={handleInput}
                  required
                />
                <span className="text-danger">{stateChange.errors.soDT}</span>
              </li>
            </ul>
          </fieldset>
        </ScrollAnimation>
        <button>Submit</button>
      </form>
    </section>
  );
}
