import React, { useState } from "react";
import "./EditUserModal.scss";
import swal from "sweetalert";
import { usersServices } from "../../services/UsersServices";
export default function AddUserModal(props) {
  let { currentUser } = props;
  let [state, setState] = useState({
    values: {
      taiKhoan: currentUser.taiKhoan,
      matKhau: currentUser.matKhau,
      hoTen: currentUser.hoTen,
      soDT: currentUser.soDt,
      maNhom: "GP08",
      maLoaiNguoiDung: currentUser.maLoaiNguoiDung,
      email: currentUser.email,
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      email: "",
      maLoaiNguoiDung: "",
    },
  });
  const handleInput = (e) => {
    var { value, name } = e.target;
    let newValues = { ...state.values, [name]: value };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "This field unempty !" : "",
    };
    setState({ values: newValues, errors: newErrors });
  };
  const handleSubmit = () => {
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
      .updateInfoUser(values)
      .then((res) => {
        swal({
          title: "Update information user successful",
          icon: "success",
          button: "OK",
        });
        console.log(res);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      })
      .catch((err) => {
        swal({
          title: err.response.data,
          icon: "warning",
          button: "OK",
        });
      });
  };
  return (
    <div
      className="editUserModal modal fade bd-example-modal-lg"
      id={`d${currentUser.taiKhoan}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <form className="formUser form-add-user">
              <fieldset>
                <legend>Edit User</legend>
                <div className="row">
                  <div className="col-6">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label>Username:</label>
                        <input
                          type="text"
                          name="taiKhoan"
                          id="username"
                          value={state.values.taiKhoan}
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.taiKhoan}
                        </span>
                      </li>
                      <li className="control-form-item">
                        <label>Email:</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={state.values.email}
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.email}
                        </span>
                      </li>
                      <li className="control-form-item">
                        <label>Password:</label>
                        <input
                          type="password"
                          name="matKhau"
                          id="password"
                          value={state.values.matKhau}
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.matKhau}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label>Name:</label>
                        <input
                          type="text"
                          name="hoTen"
                          id="name"
                          value={state.values.hoTen}
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.hoTen}
                        </span>
                      </li>
                      <li className="control-form-item">
                        <label>Phone:</label>
                        <input
                          type="tel"
                          name="soDT"
                          id="phone"
                          value={state.values.soDT}
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">{state.errors.soDT}</span>
                      </li>
                      <li className="control-form-item">
                        <label>Type User:</label>
                        <select
                          name="maLoaiNguoiDung"
                          onChange={handleInput}
                          id="loaiNguoiDung"
                          value={state.values.maLoaiNguoiDung}
                          required
                        >
                          <option value="#">--Choose type of user--</option>
                          <option value="HV">Student</option>
                          <option value="GV">Mentor</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                handleSubmit();
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
