import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CoursesCarousel.scss";
import { NavLink } from "react-router-dom";
import { coursesServices } from "../../services/CoursesServices";
import ScrollAnimation from "react-animate-on-scroll";

export default function CoursesCarousel() {
  let [courseCategories, setCourseCategories] = useState([]);
  let [course, setCourse] = useState([]);
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
  let settings = {
    dots: false,
    nav: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  const renderCourseCategories = () => {
    return courseCategories?.map((item, index) => {
      return (
        <li className="nav-item" key={index}>
          <button
            className={`nav-link nav-link--btn ${index === 0 && "active"}`}
            id="business-tab"
            data-toggle="tab"
            href={`#${item.maDanhMuc}`}
            role="tab"
            aria-controls="business"
            aria-selected="true"
          >
            {item.tenDanhMuc}
          </button>
        </li>
      );
    });
  };
  const renderCourseForm = () => {
    return courseCategories?.map((item, index) => {
      return (
        <div
          id={item.maDanhMuc}
          className={`myCourseCarousel tab-pane fade ${index === 0 && "show active"}`}
          role="tabpanel"
          key={index}
        >
          <Slider {...settings}>{renderCourses(item.maDanhMuc)}</Slider>
        </div>
      );
    });
  };

  const renderCourses = (maDanhMuc) => {
    return course?.map((item, index) => {
      if (item.danhMucKhoaHoc.maDanhMucKhoahoc === maDanhMuc) {
        return (
          <NavLink
            className="myCourseCarousel__link"
            to={`/detail-course/${item.maKhoaHoc}`}
            key={index}
          >
            <div className="item">
              <div className="item--card">
                <div className="card--img">
                  <div className="overlay"></div>
                  <img src={item.hinhAnh} alt={item.hinhAnh} />
                </div>
                <div className="card--body">
                  <div className="card--title">{item.tenKhoaHoc}</div>
                  <p className="card--actor">{item.nguoiTao.hoTen}</p>
                  <div className="card--star">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-half-alt" />
                    <span className="rating">
                      <span className="rating__point">4.5</span>
                      <span className="rating__people">({item.luotXem})</span>
                    </span>
                  </div>
                  <div className="card--price">
                    <div className="discount__price">
                      <span>$12.99</span>
                    </div>
                    <div className="original__price">
                      <span>
                        <s>$134.99</s>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        );
      } else {
        return null;
      }
    });
  };
  return (
    <section className="courses">
      <div className="courses__container">
        <div className="row">
          <div className="col-5 courses__left">
            <ScrollAnimation animateIn="bounceInLeft" duration="1.5">
              <div className="left__content">
                <div className="left__text">
                  <h5>The world’s largest selection of courses</h5>
                  <p>
                    Choose from over 100,000 online video courses with new
                    additions published every month
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="col-md-7 col-sm-12 courses__right">
            <div className="right__content">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {renderCourseCategories()}
              </ul>
              <div className="tab-content" id="myTabContent">
                {renderCourseForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
