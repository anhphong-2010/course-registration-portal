import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import "./StudentViewingCarousel.scss";
import { coursesServices } from "../../services/CoursesServices";
import ScrollAnimation from "react-animate-on-scroll";
import Loading from "../Loading/Loading";
export default function StudentViewingCarousel() {
  let [course, setCourse] = useState([]);
  let [loading, setLoading] = useState(true);
  let settings = {
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
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

  useEffect(() => {
    coursesServices
      .getCourse()
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const renderCourse = () => {
    return course?.map((item, index) => {
      return (
        <NavLink
          className="myViewCarousel__link"
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
    });
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <section className="studentViewing">
        <div className="studentViewing__container">
          <h4 className="studentViewing__title">Students are viewing</h4>
          <ScrollAnimation animateIn="fadeIn">
            <div className="studentViewing__carousel">
              <Slider {...settings}>{renderCourse()}</Slider>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    );
  }
}
