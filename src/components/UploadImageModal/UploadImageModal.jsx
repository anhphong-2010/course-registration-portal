import React, { useState } from "react";
import swal from "sweetalert";
import { coursesServices } from "../../services/CoursesServices";
import "./UploadImageModal.scss";
export default function UploadImageModal(props) {
  let { currentCourse } = props;
  let [state, setState] = useState({
    values: {
      tenKhoaHoc: currentCourse.tenKhoaHoc,
      hinhAnh: {},
    },
    errors: {
      tenKhoaHoc: "",
    },
  });
  const handleInput = (e) => {
    var { value, name } = e.target;
    let newValues = { ...state.values, [name]: value };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "This field unempty !" : "",
    };
    if (name === "hinhAnh") {
      newValues[name] = e.target.files[0];
    }

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

    let frm = new FormData();
    frm.append("file", values.hinhAnh);
    frm.append("tenKhoaHoc", values.tenKhoaHoc);

    coursesServices
      .upLoadImageCourse(frm)
      .then(() => {
        swal({
          title: "Upload Image Successful",
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
      className="uploadImageModal modal fade bd-example-modal-lg"
      id={`du${currentCourse.maKhoaHoc}`}
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
                <legend>Upload Images of Course</legend>
                <div className="row">
                  <div className="col-6">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label>Course Name:</label>
                        <input
                          type="text"
                          name="tenKhoaHoc"
                          id="tenKhoaHoc"
                          value={state.values.tenKhoaHoc}
                          onChange={handleInput}
                          disabled
                          required
                        />
                        <span className="text-danger">
                          {state.errors.tenKhoaHoc}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="control-form-list">
                      <li className="control-form-item">
                        <label>Upload Image</label>
                        <input
                          type="file"
                          style={{ width: "100%" }}
                          name="hinhAnh"
                          id="hinhAnh"
                          onChange={handleInput}
                          required
                        />
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
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
