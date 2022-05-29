import React, { useState, useEffect, Fragment } from "react";
import { usersServices } from "../../services/UsersServices";
import { useSelector } from "react-redux";
import "./MyCoursesRegistered.scss";
import ScrollAnimation from "react-animate-on-scroll";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
export default function MyCoursesRegistered() {
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
  let danhSachKhoaHoc = [];
  const [searchTerm, setSearchTerm] = useState("");
  const [coursesSearch, setCoursesSearch] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  if (infoUser !== undefined) {
    danhSachKhoaHoc = infoUser.chiTietKhoaHocGhiDanh;
  }
  useEffect(() => {
    const results = danhSachKhoaHoc.filter((khoaHoc) => {
      return khoaHoc.tenKhoaHoc
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setCoursesSearch(results);
  }, [searchTerm, danhSachKhoaHoc]);

  const huyGhiDanh = (maKhoaHoc, taiKhoan) => {
    let info = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: taiKhoan,
    };

    swal({
      title: "Are you sure?",
      text: `Cancel this course`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        usersServices
          .cancelRegisterCourse(info)
          .then((res) => {
            swal({
              title: `Cancel Register Successful`,
              icon: "success",
              button: "OK",
            });
            usersServices
              .getInfoUser(info)
              .then((res) => {
                setInfoUser(res.data);
              })
              .catch((err) => {
                console.log(err.response.data);
              });
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    });
  };
  const renderCourses = () => {
    if (infoUser !== undefined) {
      return coursesSearch.map((item, index) => {
        return (
          <div className="col-md-4 col-sm-12 mb-5" key={index}>
            <ScrollAnimation animateIn="fadeIn" duration="1">
              <div className="food-card-registered-course">
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/detail-course/${item.maKhoaHoc}`}
                >
                  <div className="food-card-registered-course__image">
                    <img
                      src="https://leverageedu.com/blog/wp-content/uploads/2019/08/Course-after-MBA.png"
                      alt="pic"
                    />
                  </div>
                </NavLink>
                <div className="food-card-registered-course__details">
                  <span className="food-card-registered-course__name">
                    {item.maKhoaHoc}
                  </span>
                  <div className="food-card-registered-course__control">
                    <button
                      className="remove-btn"
                      onClick={() => {
                        huyGhiDanh(item.maKhoaHoc, info.taiKhoan);
                      }}
                    >
                      Remove Course
                    </button>
                  </div>
                  <span className="food-card-registered-course__desc">
                    {item.tenKhoaHoc}
                  </span>
                  <div className="food-card-registered-course__price">
                    $11.90
                  </div>
                  <div className="food-card-registered-course__rating">
                    <div className="food-card-registered-course__star food-card-registered-course__star--gold" />
                    <div className="food-card-registered-course__star food-card-registered-course__star--gold" />
                    <div className="food-card-registered-course__star food-card-registered-course__star--gold" />
                    <div className="food-card-registered-course__star" />
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <Fragment>
      <form className="search-container mb-4">
        <input
          type="text"
          id="search-bar"
          name="search"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
      <div className="row">{renderCourses()}</div>
    </Fragment>
  );
}
