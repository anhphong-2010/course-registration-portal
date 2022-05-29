import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { groupID } from "../../config/settings";
import { coursesServices } from "../../services/CoursesServices";
import "./AddCourseModal.scss";
var moment = require("moment");

export default function AddCourseModal() {
  const info = JSON.parse(localStorage.getItem("userLogin"));

  const [modal, setModal] = useState(true);
  const closeButtonRef = React.useRef(null);
  let [state, setState] = useState({
    values: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "images.jpg",
      maNhom: groupID,
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: info.taiKhoan,
    },
    errors: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      hinhAnh: "",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
    },
  });
  let [courseCategories, setCourseCategories] = useState([]);
  useEffect(() => {
    coursesServices
      .getCourseCategories()
      .then((res) => {
        setCourseCategories(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const renderCategories = () => {
    return courseCategories.map((item, index) => {
      return (
        <option value={item.maDanhMuc} key={index}>
          {item.tenDanhMuc}
        </option>
      );
    });
  };
  const handleInput = (e) => {
    var { value, name } = e.target;
    let newValues = { ...state.values, [name]: value };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "This field unempty !" : "",
    };
    if (name === "ngayTao") {
      newValues[name] = moment(value).format("DD/MM/yyyy");
    }

    setState({ values: newValues, errors: newErrors });
  };

  const handleClose = async () => {
    const button = await closeButtonRef.current;
    if (!modal) button.click();
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

    coursesServices
      .createCourse(values)
      .then(() => {
        swal({
          title: "Create Course Successful",
          icon: "success",
          button: "OK",
        });
        setModal(false);
        handleClose();
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
    <>
      <button
        id="buttonClose"
        style={{ display: "none" }}
        data-dismiss="modal"
        className="close"
        aria-label="Close"
        ref={closeButtonRef}
      />
      <div
        className={`modal fade bd-example-modal-lg`}
        id="createCourseModal"
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
                  <legend>Create Course</legend>
                  <div className="row">
                    <div className="col-6">
                      <ul className="control-form-list">
                        <li className="control-form-item">
                          <label>Course Id:</label>
                          <input
                            type="text"
                            name="maKhoaHoc"
                            id="maKhoaHoc"
                            onChange={handleInput}
                            required
                          />
                          <span className="text-danger">
                            {state.errors.maKhoaHoc}
                          </span>
                        </li>
                        <li className="control-form-item">
                          <label>Course Name:</label>
                          <input
                            type="text"
                            name="tenKhoaHoc"
                            id="tenKhoaHoc"
                            onChange={handleInput}
                            required
                          />
                          <span className="text-danger">
                            {state.errors.tenKhoaHoc}
                          </span>
                        </li>
                        <li className="control-form-item">
                          <label>Alias:</label>
                          <input
                            type="text"
                            name="biDanh"
                            id="biDanh"
                            onChange={handleInput}
                            required
                          />
                          <span className="text-danger">
                            {state.errors.biDanh}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul className="control-form-list">
                        <li className="control-form-item">
                          <label>Description:</label>
                          <textarea
                            type="text"
                            name="moTa"
                            id="moTa"
                            onChange={handleInput}
                            required
                          />
                          <span className="text-danger">
                            {state.errors.moTa}
                          </span>
                        </li>
                        <li className="control-form-item">
                          <label>Created Date</label>
                          <input
                            type="date"
                            name="ngayTao"
                            id="ngayTao"
                            onChange={handleInput}
                            required
                          />
                          <span className="text-danger">
                            {state.errors.ngayTao}
                          </span>
                        </li>
                        <li className="control-form-item">
                          <label>Type User:</label>
                          <select
                            name="maDanhMucKhoaHoc"
                            onChange={handleInput}
                            id="maDanhMucKhoaHoc"
                            required
                          >
                            <option value="#">
                              --Choose course categories--
                            </option>
                            {renderCategories()}
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
                Create Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
