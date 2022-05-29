import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { coursesServices } from "../../services/CoursesServices";
import "./TopCategories.scss";
export default function TopCategories() {
  let [courseCategories, setCourseCategories] = useState([]);
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
  const renderCategories = () => {
    return courseCategories?.map((item, index) => {
      return (
        <NavLink
          className="content__above__link mb-3 col-md-3 col-sm-6"
          to="/"
          key={index}
        >
          <div className="above__item">
            <i className="fa fa-code item__icon"></i>
            <span className="item__text">{item.tenDanhMuc}</span>
          </div>
        </NavLink>
      );
    });
  };
  return (
    <section className="topCategories">
      <div className="topCategories__container">
        <div className="topCategories__title">Top categories</div>
        <div className="topCategories__content">
          <div className="content__above row">{renderCategories()}</div>
        </div>
      </div>
    </section>
  );
}
