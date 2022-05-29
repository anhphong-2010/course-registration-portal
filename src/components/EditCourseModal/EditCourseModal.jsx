import React, { useState, useEffect } from "react";
import "./EditCourseModal.scss";
import { coursesServices } from "../../services/CoursesServices";
import { groupID } from "../../config/settings";
import swal from "sweetalert";
export default function EditCourseModal(props) {
  let { currentCourse } = props;
  const info = JSON.parse(localStorage.getItem("userLogin"));
  let [state, setState] = useState({
    values: {
      maKhoaHoc: currentCourse.maKhoaHoc,
      biDanh: currentCourse.biDanh,
      tenKhoaHoc: currentCourse.tenKhoaHoc,
      moTa: currentCourse.moTa,
      luotXem: 0,
      danhGia: 0,
      hinhAnh: currentCourse.hinhAnh,
      maNhom: groupID,
      ngayTao: currentCourse.ngayTao,
      maDanhMucKhoaHoc: currentCourse.danhMucKhoaHoc.maDanhMucKhoahoc,
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

    coursesServices
      .updateCourse(values)
      .then(() => {
        swal({
          title: "Update Course Successful",
          icon: "success",
          button: "OK",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
      className="editCourseModal modal fade bd-example-modal-lg"
      id={`dc${currentCourse.maKhoaHoc}`}
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
                <legend>Edit Course</legend>
                <div className="row">
                  <div className="col-6">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label>Course Id:</label>
                        <input
                          type="text"
                          name="maKhoaHoc"
                          id="maKhoaHoc"
                          value={state.values.maKhoaHoc}
                          onChange={handleInput}
                          disabled
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
                          value={state.values.tenKhoaHoc}
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
                          value={state.values.biDanh}
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.biDanh}
                        </span>
                      </li>
                      <li className="control-form-item">
                        <label>Description:</label>
                        <textarea
                          type="text"
                          name="moTa"
                          id="moTa"
                          value={state.values.moTa}
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">{state.errors.moTa}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label>Image:</label>
                        <input
                          type="text"
                          name="hinhAnh"
                          id="hinhAnh"
                          value={state.values.hinhAnh}
                          onChange={handleInput}
                          required
                        />
                        <span className="text-danger">
                          {state.errors.hinhAnh}
                        </span>
                      </li>
                      <li className="control-form-item">
                        <label>Created Date</label>
                        <input
                          type="text"
                          name="ngayTao"
                          id="ngayTao"
                          value={state.values.ngayTao}
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
                          value={state.values.maDanhMucKhoaHoc}
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
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
