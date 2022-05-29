import React, { useState, useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "./UserInformationForm.scss";
import { usersServices } from "../../services/UsersServices";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export default function UserInformationForm() {
  let [infoUser, setInfoUser] = useState();
  let [info] = useState({
    taiKhoan: useSelector((state) => state.UserManagementReducer.taiKhoan),
    matKhau: useSelector((state) => state.UserManagementReducer.matKhau),
  });
  useEffect(() => {
    usersServices
      .getInfoUser(info)
      .then((res) => {
        setInfoUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [info]);

  const renderUI = () => {
    if (infoUser !== undefined) {
      return (
        <section id="entry-page">
          <form className="formUser form-profile">
            <ScrollAnimation animateIn="zoomIn" duration="1">
              <fieldset>
                <legend>
                  User Information{" "}
                  <NavLink to="/edit-profile">
                    <i className="fa fa-user-edit"></i>
                  </NavLink>
                </legend>
                <div className="row">
                  <div className="col-6">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label>Username:</label>
                      </li>
                      <li className="control-form-item">
                        <label>Email:</label>
                      </li>
                      <li className="control-form-item">
                        <label>Name:</label>
                      </li>
                      <li className="control-form-item">
                        <label>Type User:</label>
                      </li>
                      <li className="control-form-item">
                        <label>Phone:</label>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label>{infoUser.taiKhoan}</label>
                      </li>
                      <li className="control-form-item">
                        <label>{infoUser.email}</label>
                      </li>
                      <li className="control-form-item">
                        <label>{infoUser.hoTen}</label>
                      </li>
                      <li className="control-form-item">
                        <label>{infoUser.maLoaiNguoiDung}</label>
                      </li>
                      <li className="control-form-item">
                        <label>{infoUser.soDT}</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </fieldset>
            </ScrollAnimation>
          </form>
        </section>
      );
    } else {
      return null;
    }
  };
  return renderUI();
}
