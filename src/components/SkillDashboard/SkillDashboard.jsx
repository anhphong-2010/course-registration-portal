import React, { useEffect, useState } from "react";
import "./SkillDashboard.scss";
import { coursesServices } from "../../services/CoursesServices";
export default function SkillDashboard() {
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
  const renderCourseCategories = () => {
    return courseCategories?.map((item, index) => {
      return (
        <li
          className="chart__bar"
          style={{ width: `10% * ${index}` }}
          key={index}
        >
          <span className="chart__label">{item.tenDanhMuc}</span>
        </li>
      );
    });
  };
  return (
    <div className="skills">
      <div className="charts">
        <div className="chart chart--dev">
          <span className="chart__title">Course Categories</span>
          <ul className="chart--horiz">{renderCourseCategories()}</ul>
        </div>
        <div className="chart chart--prod">
          <span className="chart__title">Productivity</span>
          <ul className="chart--horiz">
            <li className="chart__bar" style={{ width: "75%" }}>
              <span className="chart__label">
                Git + Github, Bitbucket {"&"} Sourcetree
              </span>
            </li>
            <li className="chart__bar" style={{ width: "80%" }}>
              <span className="chart__label">Microsoft Office</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
