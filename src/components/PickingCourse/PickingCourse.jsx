import React, { useState, useEffect } from "react";
import "./PickingCourse.scss";
import { coursesServices } from "../../services/CoursesServices";
import { NavLink } from "react-router-dom";
export default function PickingCourse() {
  let [courseCategories, setCourseCategories] = useState([]);
  let [course, setCourse] = useState([]);
  let [getCategoryId, setCategoryId] = useState();
  let [getCourseId, setCourseId] = useState();
  const handleInput = (event) => {
    let categoryId = event.target.value;
    setCategoryId(categoryId);
  };
  const handleInputCourseId = (event) => {
    let courseId = event.target.value;
    setCourseId(courseId);
  };
  useEffect(() => {
    coursesServices
      .getCourseCategories()
      .then((res) => {
        setCourseCategories(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    coursesServices
      .getCourse()
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const renderCourseCategories = () => {
    return courseCategories.map((item, index) => {
      return (
        <option value={item.maDanhMuc} key={index}>
          {item.tenDanhMuc}
        </option>
      );
    });
  };
  const renderCourse = () => {
    return course.map((item, index) => {
      if (item.danhMucKhoaHoc.maDanhMucKhoahoc === getCategoryId) {
        return (
          <option value={item.maKhoaHoc} key={index}>
            {item.tenKhoaHoc}
          </option>
        );
      } else {
        return null;
      }
    });
  };
  const renderButton = () => {
    if (!getCourseId || getCourseId === "#") {
      return (
        <button
          className="getCourse-button p-2"
          style={{ borderRadius: "5px", color: "#333", marginTop: 30 }}
          disabled
        >
          Please Choose Course
        </button>
      );
    } else {
      return (
        <NavLink
          className="getCourse-link"
          to={`/detail-course/${getCourseId}`}
        >
          <button className="getCourse-button">Go To Course</button>
        </NavLink>
      );
    }
  };
  return (
    <div className="picking-course-home">
      {/* <h3 className="picking-course-title">Picking Course</h3> */}
      <form className="picking-form-home">
        <div className="form-group-item">
          <label>Course Categories:</label>
          <select
            style={{ width: "300px" }}
            id="course-categories"
            onChange={handleInput}
          >
            <option value="#">--Select Course Categories--</option>
            {renderCourseCategories()}
          </select>
        </div>
        <div className="form-group-item">
          <label>Courses:</label>
          <select
            style={{ width: "300px" }}
            id="course"
            onChange={handleInputCourseId}
          >
            <option value="#">--Select Course--</option>
            {renderCourse()}
          </select>
        </div>
        <div className="form-group-item">{renderButton()}</div>
      </form>
    </div>
  );
}
